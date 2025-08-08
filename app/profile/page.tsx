'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Tweet from '../components/Tweet';
import { PostData } from '../types';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useTheme } from '../components/ThemeProvider';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  const handleUploadSuccess = async (result: any) => {
    if (!session?.user) return;
    
    setIsUploading(true);
    try {
      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: result.info.secure_url,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update avatar');
      }

      // Update the session with the new avatar
      await update({
        ...session,
        user: {
          ...session.user,
          image: result.info.secure_url,
        },
      });

      router.refresh();
    } catch (error) {
      console.error('Error updating avatar:', error);
      alert('Failed to update avatar. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleThemeToggle = () => {
    console.log('Profile page theme toggle clicked');
    console.log('Current theme:', theme);
    toggleTheme();
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 dark:bg-dark-card rounded-lg mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-dark-card rounded"></div>
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
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text">Please sign in to view your profile</h1>
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

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text">Profile Settings</h1>
        
        <div className="bg-white dark:bg-dark-card rounded-lg shadow p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <img
                src={session.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user?.email || 'anonymous'}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0">
                <CldUploadWidget
                  uploadPreset="tweet_avatars"
                  onSuccess={handleUploadSuccess}
                  onError={(error) => {
                    console.error('Upload error:', error);
                    alert('Failed to upload image. Please try again.');
                  }}
                  options={{
                    maxFiles: 1,
                    resourceType: 'image',
                    clientAllowedFormats: ['image/jpeg', 'image/png', 'image/gif'],
                    maxFileSize: 5000000, // 5MB
                  }}
                >
                  {({ open }) => (
                    <button
                      onClick={() => open()}
                      disabled={isUploading}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? (
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">{session.user?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{session.user?.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-dark-border pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-dark-text">Theme</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
              </div>
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-yellow-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-dark-border">
        {posts.map((post) => (
          <Tweet
            key={post.id}
            {...post}
            showReplyButton={true}
            currentUserId={session.user?.id}
          />
        ))}
        {posts.length === 0 && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No posts yet. Start by creating your first post!
          </div>
        )}
      </div>
    </div>
  );
} 