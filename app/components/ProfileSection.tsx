'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface ProfileSectionProps {
  session: any;
}

export default function ProfileSection({ session }: ProfileSectionProps) {
  return (
    <div className="header-right flex items-center gap-4">
      {session ? (
        <>
          <Link
            href="/profile"
            className="header-profile-link flex items-center gap-2 text-gray-700 hover:text-blue-500"
          >
            <div className="tweet-avatar-container">
              <img
                src={session.user?.image || 'https://res.cloudinary.com/dnqygbued/image/upload/tweet_avatars/default-avatar.png'}
                alt={session.user?.name || 'Profile'}
                className="tweet-avatar-image w-10 h-10 rounded-full"
              />
            </div>
            <span className="header-profile-name">{session.user?.name}</span>
          </Link>
          <button
            onClick={() => signOut()}
            className="header-signout-button text-gray-700 hover:text-blue-500"
          >
            Sign out
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="header-signin-link text-gray-700 hover:text-blue-500"
        >
          Sign in
        </Link>
      )}
    </div>
  );
} 