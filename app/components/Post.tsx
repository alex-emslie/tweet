'use client';

import Image from 'next/image';
import { PostProps } from '../types';

export default function Post(props: PostProps) {
  const { author, content, timestamp, showReplyButton, onReply } = props;

  return (
    <div className="post-container">
      <div className="post-header flex items-start gap-3">
        <div className="post-avatar">
        <Image
          src={author.avatar}
          alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
        />
        </div>
        <div className="post-content flex-1">
          <div className="post-author-info flex items-center gap-1">
            <span className="post-author-name font-bold">{author.name}</span>
            <span className="post-author-handle text-gray-500">@{author.handle}</span>
            <span className="post-timestamp text-gray-500">· {timestamp}</span>
          </div>
          <p className="post-text mt-1">{content}</p>
          {showReplyButton && (
            <div className="post-actions mt-3">
            <button 
              onClick={onReply}
                className="post-reply-button flex items-center gap-2 text-gray-500 hover:text-blue-500"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
                <span>Reply</span>
            </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 