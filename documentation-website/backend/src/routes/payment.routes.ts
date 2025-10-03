import express from "express";
import { paymentHandler, refundHandler } from "../controllers/payments.controller";

const router = express.Router();

router.post("/handle-subscription", paymentHandler);
router.post("/refund/:sessionId", refundHandler);

export default router;