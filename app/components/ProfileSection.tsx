'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Session } from 'next-auth';

interface ProfileSectionProps {
  session: Session | null;
}

export default function ProfileSection({ session: serverSession }: ProfileSectionProps) {
  const { data: clientSession } = useSession();
  const currentSession = clientSession || serverSession;

  if (!currentSession?.user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/create"
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        Create Tweet
      </Link>
      <div className="relative group">
        <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          <img
            src={currentSession.user.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + currentSession.user.email}
            alt={currentSession.user.name || 'User avatar'}
            className="w-8 h-8 rounded-full"
          />
          <span>{currentSession.user.name}</span>
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-md shadow-lg py-1 hidden group-hover:block">
          <Link
            href={`/profile/${currentSession.user.id}`}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border"
          >
            Profile
          </Link>
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
} 