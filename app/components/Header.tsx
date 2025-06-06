'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="header-main sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="header-container max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="header-left flex items-center gap-4">
          <div className="header-title text-xl font-bold">
            Feed
          </div>
        </div>
      </div>
    </header>
  );
} 