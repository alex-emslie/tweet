'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/profile" className="text-gray-700 hover:text-gray-900">
          Profile
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/login"
        className="text-gray-700 hover:text-gray-900"
      >
        Sign In
      </Link>
      <Link
        href="/register"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </Link>
    </div>
  );
} 