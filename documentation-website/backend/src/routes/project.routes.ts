import express from 'express';
import { createProject } from '../controllers/project.controller';

const router = express.Router();

router.post("/create-project", createProject);

export default router;