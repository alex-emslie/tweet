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
            avatar: session?.user?.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'
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
    <div className={`tweet-reply-form mt-4 ${isNested ? '' : 'ml-12'}`}>
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write your reply..."
        className="tweet-reply-textarea w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
      <div className="tweet-reply-actions flex justify-end gap-2 mt-2">
        <button
          onClick={() => {
            setShowReply(false);
            setReplyingToId(null);
          }}
          className="tweet-reply-cancel-btn px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmitReply}
          disabled={!replyText.trim()}
          className="tweet-reply-submit-btn px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reply
        </button>
      </div>
    </div>
  );

  return (
    <div className="tweet-container p-4">
      <div className="tweet-header flex items-start gap-3">
        <div className="tweet-avatar">
          <img
            src={props.author.avatar}
            alt={props.author.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="tweet-content flex-1">
          <div className="tweet-author-info flex items-center gap-1">
            <span className="tweet-author-name font-bold">{props.author.name}</span>
            <span className="tweet-author-handle text-gray-500">@{props.author.handle}</span>
            <span className="tweet-timestamp text-gray-500">· {formatDate(props.createdAt)}</span>
          </div>
          <p className="tweet-text mt-1">{props.content}</p>
          <div className="tweet-actions flex items-center gap-6 mt-3">
            {props.showReplyButton && (
              <button 
                onClick={() => handleReply()}
                className="tweet-reply-button flex items-center gap-2 text-gray-500 hover:text-blue-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Reply</span>
              </button>
            )}
            <button 
              onClick={handleLike}
              className={`tweet-like-button flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            >
              <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{likes}</span>
            </button>
          </div>
        </div>
      </div>

      {showReply && !replyingToId && renderReplyForm()}

      {replies.length > 0 && (
        <div className="tweet-replies mt-4 pl-12">
          {showReplies && replies.map((reply) => (
            <div key={reply.id} className="tweet-reply-item py-3 border-t border-gray-200">
              <div className="tweet-reply-header flex items-center gap-2">
                <img
                  src={reply.author.avatar}
                  alt={reply.author.name}
                  className="tweet-reply-avatar w-8 h-8 rounded-full"
                />
                <span className="tweet-reply-author font-bold">{reply.author.name}</span>
                <span className="tweet-reply-handle text-gray-500">@{reply.author.handle}</span>
                <span className="tweet-reply-timestamp text-gray-500">· {formatDate(reply.createdAt)}</span>
              </div>
              <p className="tweet-reply-content mt-1">{reply.content}</p>
              <div className="tweet-reply-actions flex items-center gap-6 mt-3">
                {props.showReplyButton && (
                  <button 
                    onClick={() => handleReply(reply.id)}
                    className="tweet-reply-button flex items-center gap-2 text-gray-500 hover:text-blue-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Reply</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 