import express from "express";
import { getUploads, updateFeedback, upload,  } from "../controllers/upload.controller";

const router = express.Router();

router.post("/upload-post/:id", upload);
router.get("/feed/:id", getUploads);
router.post("/feedback", updateFeedback);

export default router;