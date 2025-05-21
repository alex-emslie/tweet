export interface Author {
  name: string;
  handle: string;
  avatar: string;
}

export interface PostData {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
  image?: string;
  replies?: PostData[];
  isLiked?: boolean;
}

export interface PostProps {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  size?: 'small' | 'large';
  showReplyButton?: boolean;
  onReply?: () => void;
  currentUserId?: string;
} 