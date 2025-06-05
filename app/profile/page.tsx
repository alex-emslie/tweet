'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Tweet from '../components/Tweet';
import { PostData } from '../types';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserPosts = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/posts?userId=${session.user.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error('Error loading posts:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadUserPosts();
  }, [session?.user?.id]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
          <a
            href="/login"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'Profile'}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full" />
          )}
          <div>
            <h1 className="text-xl font-bold">{session?.user?.name}</h1>
            <p className="text-gray-500">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {posts.map((post) => (
          <Tweet
            key={post.id}
            {...post}
            showReplyButton={true}
            currentUserId={session?.user?.id}
          />
        ))}
        {posts.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No posts yet. Start by creating your first post!
          </div>
        )}
      </div>
    </div>
  );
} 