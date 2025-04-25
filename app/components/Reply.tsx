'use client';

import Post from './Post';
import { PostData } from '../types';
import { useState } from 'react';
import ReplyForm from './ReplyForm';

interface ReplyProps extends PostData {
  showReplyButton?: boolean;
  onReply?: () => void;
  currentUserId?: string;
}

export default function Reply(props: ReplyProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = () => {
    setShowReplyForm(true);
  };

  const handleReplySubmit = () => {
    setShowReplyForm(false);
  };

  return (
    <div className="pl-8 border-l-2 border-gray-200">
      <Post 
        {...props} 
        size="small" 
        showReplyButton={props.showReplyButton}
        onReply={handleReply}
        currentUserId={props.currentUserId}
      />
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