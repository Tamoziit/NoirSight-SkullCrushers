import express from 'express';
import { createProject, getProjects } from '../controllers/project.controller';

const router = express.Router();

router.post("/create-project", createProject);
router.get("/get-projects/:email", getProjects);

export default router;