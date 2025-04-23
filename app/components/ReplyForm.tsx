'use client';

import { useState } from 'react';
import { createReply } from '../actions/post';
import { useSession } from 'next-auth/react';

interface ReplyFormProps {
  parentId: string;
  onReply: () => void;
}

export default function ReplyForm({ parentId, onReply }: ReplyFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting || !session?.user?.id) return;

    setIsSubmitting(true);
    try {
      await createReply(parentId, content, session.user.id);
      setContent('');
      onReply();
    } catch (error) {
      console.error('Failed to create reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows={3}
        disabled={isSubmitting}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting || !session?.user?.id}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Replying...' : 'Reply'}
        </button>
      </div>
    </form>
  );
} 