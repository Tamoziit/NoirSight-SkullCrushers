import {
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

interface SignupParams {
  username: string;
  email: string;
  password: string;
  mobileNo: string;
  gender: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface AuthUser {
  _id: string;
  username: string;
  email: string;
  mobileNo: string;
  gender: "M" | "F" | "O";
  profilePic?: string | null;
}

interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: Dispatch<SetStateAction<AuthUser | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface Post {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
    profilePic?: string | null;
  };
  type: "image" | "video";
  url: string;
  modelResult: "fake" | "real";
  confidence: number;
  positiveReviews: number;
  negativeReviews: number;
  createdAt: string;
  updatedAt: string;
}

interface PostProps {
  post: Post;
  index: number;
}

interface UploadProps {
  url: string;
  type: "image" | "video";
}

interface ModelResponse {
  _id: string;
  userId: string;
  type: "video" | "image";
  url: string;
  modelResult: "fake" | "real";
  confidence: number;
  positiveReviews: number;
  negativeReviews: number;
  createdAt: string;
  updatedAt: string;
}

interface UploadFlagProps {
  type: "image" | "video";
  modelResult: "fake" | "real";
  confidence: number;
}

interface FeedbackProps {
  feedback: "yes" | "no";
  id: string;
}

interface Thread {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
    profilePic?: string | null;
  };
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface ThreadProps {
  thread: Thread;
  index: number;
}

interface UploadThreadProps {
  text: string;
}

export interface RelatedArticles {
  url: string;
  verdict: "strongly relevant and consistent" | "strongly relevant but inconsistent" | "weakly relevant" | "not relevant";
  gemini_analysis?: string | null;
}

export interface ArticleResponse {
  classification: "contextual" | "factual";
  reasons: string[];
  related_articles: RelatedArticles[];
}