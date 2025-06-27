import { Request, Response } from "express";
import stripe from "../services/stripeInit";
import Company from "../models/companies.model";
import { CompanyProps } from "../types";

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