export interface Author {
  name: string;
  handle: string;
  avatar: string;
}

export interface PostData {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
  likes: number;
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