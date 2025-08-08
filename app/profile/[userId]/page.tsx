'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Tweet from '../../components/Tweet';
import { PostData } from '../../types';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../components/ThemeProvider';

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { userId } = params;

  const isOwnProfile = session?.user?.id === userId;

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // Load user posts
        const postsResponse = await fetch(`/api/posts?userId=${userId}`);
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts');
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Load user info (you might need to create this API endpoint)
        // For now, we'll use the session data if it's the current user's profile
        if (isOwnProfile && session?.user) {
          setUser(session.user);
        } else {
          // For other users, you might want to create a /api/user/[userId] endpoint
          setUser({
            id: userId,
            name: 'User',
            image: null,
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      loadUserProfile();
    }
  }, [userId, session?.user, isOwnProfile]);

  const handleUploadSuccess = async (result: any) => {
    if (!session?.user || !isOwnProfile) return;
    
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

  if (isLoading) {
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
          <h1 className="text-2xl font-bold mb-4">Please log in to view profiles</h1>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-white dark:bg-dark-card rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user?.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user?.email}
                alt={user?.name || 'User avatar'}
                className="w-16 h-16 rounded-full"
              />
              {isOwnProfile && (
                <CldUploadWidget
                  uploadPreset="tweet_avatars"
                  onSuccess={handleUploadSuccess}
                  options={{
                    maxFiles: 1,
                    resourceType: 'image',
                    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
                    maxFileSize: 5000000, // 5MB
                  }}
                >
                  {({ open }) => (
                    <button
                      onClick={() => open()}
                      disabled={isUploading}
                      className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 disabled:opacity-50"
                      title="Change avatar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold">{user?.name || 'User'}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleThemeToggle}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? 'tweet' : 'tweets'}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              {isOwnProfile ? "You haven't posted anything yet." : "This user hasn't posted anything yet."}
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <Tweet
              key={post.id}
              {...post}
              showReplyButton={status === 'authenticated'}
              currentUserId={session?.user?.id}
            />
          ))
        )}
      </div>
    </div>
  );
} 