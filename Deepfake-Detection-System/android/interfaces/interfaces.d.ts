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