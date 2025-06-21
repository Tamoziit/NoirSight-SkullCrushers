import express from "express";
import { getThreads, uploadThread } from "../controllers/threads.controller";

const router = express.Router();

router.post("/post-thread/:id", uploadThread);
router.get("/get-threads/:id", getThreads);

export default router;