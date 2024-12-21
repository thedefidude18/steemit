export interface User {
  id: string;
  walletAddress: string;
  username: string;
  reputation: number;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  tags: string[];
  upvotes: number;
  downvotes: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  parentId?: string;
  content: string;
  createdAt: string;
  author: User;
  replies?: Comment[];
}

export interface Vote {
  id: string;
  userId: string;
  postId: string;
  voteType: boolean;
  amount: number;
  createdAt: string;
}