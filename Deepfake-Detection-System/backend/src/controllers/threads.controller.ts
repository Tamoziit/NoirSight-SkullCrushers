import { Request, Response } from "express";
import User from "../models/user.model";
import Thread from "../models/threads.model";
import { ThreadProps } from "../types";

export const uploadThread = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const { text }: ThreadProps = req.body;

        if (!userId) {
            res.status(400).json({ error: "Cannot find user ID" });
            return;
        }
        if (!text) {
            res.status(400).json({ error: "Text is required" });
            return;
        }
        if (text.length < 3) {
            res.status(400).json({ error: "Text should be of minimum length of 3" });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ error: "Cannot find user" });
            return;

        }

        const newThread = new Thread({
            userId,
            text
        });

        if (newThread) {
            await Promise.all([
                newThread.save(),
                (async () => {
                    user.threads.push(newThread._id);
                    await user.save();
                })(),
            ]);

            res.status(201).json(newThread);
        } else {
            res.status(400).json({ error: "Couldn't Upload video" });
        }
    } catch (error) {
        console.log("Error in uploadThread controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getThreads = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        if (!id) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }

        const user = await User.findById(id);
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        const totalThreads = await Thread.countDocuments({ userId: { $ne: id } });

        const threads = await Thread.find({ userId: { $ne: id } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'userId',
                select: 'username email profilePic',
                model: User
            });

        res.status(200).json({
            totalPages: Math.ceil(totalThreads / limit),
            currentPage: page,
            totalThreads,
            threads,
        });
    } catch (error) {
        console.log("Error in getUploads controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}