'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
            alt="Your avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <h1 className="text-xl font-bold text-gray-900">Home</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
} 