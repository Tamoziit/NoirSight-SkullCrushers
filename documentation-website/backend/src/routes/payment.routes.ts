import express from "express";
import { paymentHandler } from "../controllers/payments.controller";

const router = express.Router();

router.post("/handle-subscription", paymentHandler);

export default router;