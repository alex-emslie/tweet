'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Post from './Post';
import Reply from './Reply';
import { PostData } from '../types';
import { useSession } from 'next-auth/react';
import { createPost, createReply } from '../actions/post';

interface TweetProps extends PostData {}

export default function Tweet(props: TweetProps) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<PostData[]>([]);
  const [postId, setPostId] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const createParentPost = async () => {
      if (session?.user?.id && !postId) {
        try {
          const post = await createPost(props.content, session.user.id);
          setPostId(post.id);
        } catch (error) {
          console.error('Failed to create parent post:', error);
        }
      }
    };
    createParentPost();
  }, [session?.user?.id, props.content, postId]);

  const handleReply = () => {
    if (session?.user?.id) {
      setShowReply(!showReply);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim() && session?.user?.id && postId) {
      try {
        const reply = await createReply(postId, replyText, session.user.id);
        const newReply: PostData = {
          id: reply.id,
          author: {
            name: session.user.name || 'You',
            handle: session.user.email?.split('@')[0] || 'you',
            avatar: session.user.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'
          },
          content: replyText,
          timestamp: 'now',
          likes: 0
        };
        setReplies([...replies, newReply]);
        setReplyText('');
        setShowReply(false);
      } catch (error) {
        console.error('Failed to create reply:', error);
      }
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
      <Post 
        {...props} 
        showReplyButton={!!session?.user?.id} 
        onReply={handleReply}
        currentUserId={session?.user?.id}
      />
      {showReply && session?.user?.id && (
        <form onSubmit={handleSubmitReply} className="mt-4">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <Image
                src={session.user.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'}
                alt="Your avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Tweet your reply"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!replyText.trim() || !postId}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      {replies.length > 0 && (
        <div className="mt-4 space-y-4 border-l-2 border-gray-200 pl-4">
          {replies.map((reply) => (
            <Reply key={reply.id} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
} 