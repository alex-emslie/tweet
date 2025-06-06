'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfileSection({ session }: { session: any }) {
  return (
    <div className="flex items-center gap-4">
      {session ? (
        <Link
          href="/profile"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <img
            src={session.user?.image || 'https://res.cloudinary.com/dnqygbued/image/upload/tweet_avatars/default-avatar.png'}
            alt={session.user?.name || 'Profile'}
            className="w-8 h-8 rounded-full"
          />
          <span className="hidden sm:inline">{session.user?.name}</span>
        </Link>
      ) : (
        <Link
          href="/login"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          Sign In
        </Link>
      )}
    </div>
  );
} 