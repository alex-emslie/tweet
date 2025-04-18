'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PostProps } from '../types';
import { toggleLike, getLikeCount, isLikedByUser } from '../actions/post';

export default function Post({ 
  id,
  author, 
  content, 
  timestamp, 
  size = 'large',
  showReplyButton = false,
  onReply,
  currentUserId
}: PostProps) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLikeData = async () => {
      if (id && currentUserId) {
        const [likeCount, liked] = await Promise.all([
          getLikeCount(id),
          isLikedByUser(id, currentUserId)
        ]);
        setLikes(likeCount);
        setIsLiked(liked);
      }
    };
    fetchLikeData();
  }, [id, currentUserId]);

  const handleLike = async () => {
    if (!id || !currentUserId || isLoading) return;
    
    setIsLoading(true);
    try {
      const newIsLiked = await toggleLike(id, currentUserId);
      setIsLiked(newIsLiked);
      setLikes(prev => newIsLiked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const avatarSize = size === 'small' ? 32 : 48;
  const iconSize = size === 'small' ? 'h-4 w-4' : 'h-5 w-5';
  const textSize = size === 'small' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <Image
          src={author.avatar}
          alt={author.name}
          width={avatarSize}
          height={avatarSize}
          className="rounded-full hover:opacity-90 transition-opacity"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1">
          <span className="font-bold text-gray-900 hover:underline">{author.name}</span>
          <span className="text-gray-500">@{author.handle}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500 hover:underline">{timestamp}</span>
        </div>
        <p className="mt-2 text-gray-900 whitespace-pre-line">{content}</p>
        <div className="mt-3 flex items-center space-x-4">
          <button
            onClick={handleLike}
            disabled={isLoading}
            className={`flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors ${
              isLiked ? 'text-red-500' : ''
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg
              className={iconSize}
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className={textSize}>{likes}</span>
          </button>
          {showReplyButton && (
            <button 
              onClick={onReply}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className={textSize}>Reply</span>
            </button>
          )}
          {size === 'large' && (
            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
              <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span className={textSize}>Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 