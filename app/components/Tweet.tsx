'use client';

import { useState } from 'react';
import { PostData } from '../types';
import { useSession } from 'next-auth/react';
import { createReply } from '../actions/post';

interface TweetProps extends PostData {
  showReplyButton?: boolean;
  currentUserId?: string;
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function Tweet(props: TweetProps) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<PostData[]>(props.replies || []);
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes || 0);
  const [showReplies, setShowReplies] = useState(true);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState({
    name: session?.user?.name || 'Anonymous',
    avatar: session?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.email || 'anonymous'}`
  });

  const handleReply = (replyId?: string) => {
    if (props.currentUserId) {
      setReplyingToId(replyId || null);
      setShowReply(true);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim() && props.currentUserId) {
      try {
        const reply = await createReply(props.id, replyText, props.currentUserId);
        const newReply: PostData = {
          id: reply.id,
          author: {
            name: session?.user?.name || 'You',
            handle: session?.user?.email?.split('@')[0] || 'you',
            avatar: session?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.email || 'anonymous'}`
          },
          content: replyText,
          createdAt: new Date().toISOString(),
          likes: 0,
          replies: []
        };

        setReplies([...replies, newReply]);
        setReplyText('');
        setShowReply(false);
        setReplyingToId(null);
      } catch (error) {
        console.error('Failed to create reply:', error);
      }
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const renderReplyForm = (isNested: boolean = false) => (
    <div className={`tweet-reply-form-container mt-4 ${isNested ? '' : 'ml-12'}`}>
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write your reply..."
        className="tweet-reply-form-textarea w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
      <div className="tweet-reply-form-actions flex justify-end gap-2 mt-2">
        <button
          onClick={() => {
            setShowReply(false);
            setReplyingToId(null);
          }}
          className="tweet-reply-form-cancel-btn px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmitReply}
          disabled={!replyText.trim()}
          className="tweet-reply-form-submit-btn px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reply
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-card transition-colors duration-200">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            src={props.author.avatar}
            alt={props.author.name}
            className="w-5 h-5 rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1">
            <p className="text-sm font-medium text-gray-900 dark:text-dark-text">
              {props.author.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{props.author.handle}
            </p>
            <span className="text-gray-500 dark:text-gray-400">·</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(props.createdAt)}
            </p>
          </div>
          <p className="text-sm text-gray-900 dark:text-dark-text mt-1">
            {props.content}
          </p>
          {props.image && (
            <div className="mt-2">
              <img
                src={props.image}
                alt="Post attachment"
                className="rounded-lg max-h-96 w-full object-cover"
              />
            </div>
          )}
          <div className="mt-2 flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 text-sm ${
                isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
              } hover:text-red-500 transition-colors duration-200`}
            >
              <svg
                className="h-5 w-5"
                fill={isLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likes}</span>
            </button>
            {props.showReplyButton && (
              <button
                onClick={() => handleReply(props.id)}
                className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{props.replies?.length || 0}</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {showReply && !replyingToId && renderReplyForm()}
      {replies.length > 0 && (
        <div className="ml-12 mt-4 space-y-4">
          {showReplies && replies.map((reply) => (
            <div
              key={reply.id}
              className="flex space-x-3 p-3 bg-gray-50 dark:bg-dark-card rounded-lg"
            >
              <div className="flex-shrink-0">
                <img
                  src={reply.author.avatar}
                  alt={reply.author.name}
                  className="w-5 h-5 rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-dark-text">
                    {reply.author.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{reply.author.handle}
                  </p>
                  <span className="text-gray-500 dark:text-gray-400">·</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(reply.createdAt)}
                  </p>
                </div>
                <p className="text-sm text-gray-900 dark:text-dark-text mt-1">
                  {reply.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 