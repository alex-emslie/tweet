'use client';

import Post from './Post';
import { PostData } from '../types';
import { useState } from 'react';
import ReplyForm from './ReplyForm';
import Image from 'next/image';
import { PostProps } from '../types';

interface ReplyProps extends PostData {
  showReplyButton?: boolean;
  onReply?: () => void;
  currentUserId?: string;
}

export default function Reply(props: PostProps) {
  const { author, content, timestamp, showReplyButton, onReply } = props;
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = () => {
    setShowReplyForm(true);
  };

  const handleReplySubmit = () => {
    setShowReplyForm(false);
  };

  return (
    <div className="reply-container">
      <div className="reply-header flex items-start gap-3">
        <div className="reply-avatar">
          <Image
            src={author.avatar}
            alt={author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <div className="reply-content flex-1">
          <div className="reply-author-info flex items-center gap-1">
            <span className="reply-author-name font-bold">{author.name}</span>
            <span className="reply-author-handle text-gray-500">@{author.handle}</span>
            <span className="reply-timestamp text-gray-500">· {timestamp}</span>
          </div>
          <p className="reply-text mt-1">{content}</p>
          {showReplyButton && (
            <div className="reply-actions mt-3">
              <button
                onClick={onReply}
                className="reply-reply-button flex items-center gap-2 text-gray-500 hover:text-blue-500"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Reply</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {showReplyForm && (
        <div className="mt-2 ml-8">
          <ReplyForm 
            parentId={props.id}
            onReply={handleReplySubmit}
          />
        </div>
      )}
    </div>
  );
} 