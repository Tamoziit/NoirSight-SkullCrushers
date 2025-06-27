import { Request, Response } from "express";
import { CompanyProps } from "../types";
import Company from "../models/companies.model";
import { addMonths } from "date-fns";
import generateApiKey from "../utils/generateApiKey";
import stripe from "../services/stripeInit";

export const createProject = async (req: Request, res: Response) => {
	try {
		const sessionId = req.params.sessionId;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.mode !== "subscription" || !session.subscription) {
			res.status(400).json({ error: "Subscription not active" });
			return;
		}
		const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

		if (subscription.status !== "active") {
			res.status(400).json({ error: "Subscription not active" });
			return;
		}

		const { email, company, projectName } = session.metadata!;
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

		const apiKey = generateApiKey(company, projectName);
		const validity = addMonths(new Date(), 3); // 3 months from now

		const newProject = {
			company,
			projectName,
			apiKey,
			validity
		};

		let userId;
		if (existingCompanyDoc) {
			existingCompanyDoc.projects.push(newProject);
			await existingCompanyDoc.save();
			userId = existingCompanyDoc?._id;
		} else {
			const newCompany = new Company({
				email,
				projects: [newProject]
			});
			await newCompany.save();
			userId = newCompany?._id;
		}

		if (newProject) {
			res.status(201).json({
				...newProject,
				userId,
			});
		}
	} catch (error) {
		console.log("Error in generateApiKey controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const getProjects = async (req: Request, res: Response) => {
	try {
		const email = req.params.email;
		const user = await Company.findOne({ email });
		if (!user) {
			res.status(400).json({ error: "Cannot find User" });
			return;
		}

		if (Array.isArray(user.projects)) {
			user.projects.sort((a, b) => {
				return new Date(b.validity).getTime() - new Date(a.validity).getTime();
			});
		} // most recent projects first

		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getProjects controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}