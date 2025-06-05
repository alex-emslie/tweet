'use client';

import { useState, useEffect } from 'react';
import Tweet from './Tweet';
import { PostData } from '../types';
import { useSession } from 'next-auth/react';

export default function Feed() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error loading feed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeed();
  }, []);

  // Only show reply buttons when session is authenticated
  const showReplyButton = status === 'authenticated' && !!session?.user?.id;

  if (isLoading) {
    return (
      <div className="feed-container divide-y divide-gray-200">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="feed-container divide-y divide-gray-200">
      {posts.map((post) => (
        <Tweet 
          key={post.id} 
          {...post} 
          showReplyButton={showReplyButton}
          currentUserId={session?.user?.id}
        />
      ))}
    </div>
  );
} 