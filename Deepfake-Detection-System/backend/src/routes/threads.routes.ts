import express from "express";
import { analyseThread, getThreads, uploadThread } from "../controllers/threads.controller";

const router = express.Router();

router.post("/post-thread/:id", uploadThread);
router.get("/get-threads/:id", getThreads);
router.post("/analyze-article", analyseThread);

export default router;