'use client';

import { useState, useEffect } from 'react';
import Tweet from './Tweet';
import { PostData } from '../types';
import { useSession } from 'next-auth/react';

export default function Feed() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tweetContent, setTweetContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCreateTweet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tweetContent.trim() || !session?.user?.id || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: tweetContent,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create tweet');
      }

      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setTweetContent('');
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating tweet:', error);
      alert('Failed to create tweet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only show reply buttons when session is authenticated
  const showReplyButton = status === 'authenticated' && !!session?.user?.id;

  if (isLoading) {
    return (
      <div className="feed-loading-container w-full divide-y divide-gray-200">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="feed-loading-skeleton p-4 animate-pulse">
            <div className="feed-loading-content flex items-start gap-3">
              <div className="feed-loading-avatar w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="feed-loading-text flex-1">
                <div className="feed-loading-name h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="feed-loading-content h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="feed-container w-full relative">
      <div className="feed-posts-container w-full divide-y divide-gray-200">
        {posts.map((post) => (
          <Tweet 
            key={post.id} 
            {...post} 
            showReplyButton={showReplyButton}
            currentUserId={session?.user?.id}
          />
        ))}
      </div>

      {status === 'authenticated' && (
        <>
          {showCreateForm && (
            <div className="feed-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="feed-modal-container bg-white rounded-lg w-full max-w-[550px] p-4">
                <form onSubmit={handleCreateTweet} className="feed-create-form">
                  <textarea
                    value={tweetContent}
                    onChange={(e) => setTweetContent(e.target.value)}
                    placeholder="What's happening?"
                    className="feed-create-textarea w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <div className="feed-create-actions flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateForm(false);
                        setTweetContent('');
                      }}
                      className="feed-create-cancel-btn px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!tweetContent.trim() || isSubmitting}
                      className="feed-create-submit-btn px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Posting...' : 'Tweet'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <button
            onClick={() => setShowCreateForm(true)}
            className="feed-create-button fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center z-40"
          >
            <svg className="feed-create-icon w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
} 