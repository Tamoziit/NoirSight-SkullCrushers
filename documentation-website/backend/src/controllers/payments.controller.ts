import { Request, Response } from "express";
import stripe from "../services/stripeInit";
import Company from "../models/companies.model";
import { CompanyProps } from "../types";
import Stripe from "stripe";

export const paymentHandler = async (req: Request, res: Response) => {
    try {
        const baseUrl = process.env.BASE_URL;
        const { company, projectName, email } = req.body;

        if (projectName.length < 2) {
            res.status(400).json({ error: "Name should be at least 2 characters long" });
            return;
        }

        const existingCompanyDoc = await Company.findOne({ email });
        const isDuplicate = (doc: CompanyProps) =>
            doc.projects.some(
                (proj) =>
                    proj.company === company &&
                    proj.projectName === projectName
            );

        if (existingCompanyDoc && isDuplicate(existingCompanyDoc)) {
            res.status(400).json({
                error: "A project with the same name and company already exists for this user."
            });
            return;
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            customer_email: email,
            phone_number_collection: {
                enabled: true
            },
            success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/payment/cancel?reason=cancelled`,
            metadata: {
                email,
                company,
                projectName,
            },
            allow_promotion_codes: true
        });

        res.json({ url: session.url });
    } catch (error) {
        console.log("Error in paymentHandler", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const refundHandler = async (req: Request, res: Response) => {
    try {
        const sessionId = req.params.sessionId;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (!session.subscription || typeof session.subscription !== "string") {
            res.status(400).json({ error: "No valid subscription found for this session." });
            return;
        }

        // Retrieving the subscription
        const subscription = await stripe.subscriptions.retrieve(session.subscription);

        // Getting the latest invoice ID
        const latestInvoiceId = subscription.latest_invoice;
        if (!latestInvoiceId || typeof latestInvoiceId !== "string") {
            res.status(400).json({ error: "No valid invoice found for the subscription." });
            return;
        }

        // Retrieving the invoice
        const invoice = await stripe.invoices.retrieve(latestInvoiceId);

        // Getting the customer from the invoice
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;

        if (!customerId) {
            res.status(400).json({ error: "No customer found for this invoice." });
            return;
        }

        // Finding the charge for this specific invoice by looking at recent charges for the customer
        const charges = await stripe.charges.list({
            customer: customerId,
            created: {
                gte: invoice.created - 60, // Looking for charges created around the invoice time
                lte: invoice.created + 60
            },
            limit: 10
        });

        // Finding the charge that matches the invoice amount
        const matchingCharge = charges.data.find(charge =>
            charge.amount === invoice.amount_paid &&
            charge.paid === true &&
            charge.status === 'succeeded'
        );

        if (!matchingCharge) {
            res.status(400).json({ error: "No matching charge found for this invoice." });
            return;
        }

        // Creating refund using the charge
        const refund = await stripe.refunds.create({
            charge: matchingCharge.id,
            reason: "requested_by_customer"
        });

        res.status(200).json(refund);
    } catch (error) {
        console.error("Error in refundHandler", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};