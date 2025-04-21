'use client';

import Link from 'next/link';

export default function AuthButtons() {
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Sign up
      </Link>
    </div>
  );
} 