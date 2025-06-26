export interface ProjectCreationProps {
  company: string;
  projectName: string;
}

export interface ApiKeyData {
  apiKey: string;
  company: string;
  projectName: string;
  userId: string;
  validity: string;
}

export interface Project {
  company: string;
  projectName: string;
  apiKey: string;
  validity: string;
  _id: string;
}

export interface ProjectProps {
  _id: string;
  projects: Project[];
  email: string;
  createdAt: string;
  updatedAt: string;
}