import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import { getServerSession } from 'next-auth';
import SessionProvider from './components/SessionProvider';
import { authOptions } from './auth';
import Providers from './components/Providers';
import Link from 'next/link';
import ProfileSection from './components/ProfileSection';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tweet App',
  description: 'A Twitter-like application built with Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-200`}>
        <SessionProvider session={session}>
          <ThemeProvider>
            <Providers session={session}>
              <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
                <header className="bg-white dark:bg-dark-card shadow-sm">
                  <div className="max-w-[600px] w-full mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                      <div className="flex items-center gap-4">
                        <Link
                          href="/"
                          className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-dark-border"
                          aria-label="Go to home feed"
                        >
                          <svg 
                            viewBox="0 0 24 24" 
                            width="24" 
                            height="24" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            fill="none"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-dark-text">Twitter Clone</h1>
                      </div>
                      <ProfileSection session={session} />
                    </div>
                  </div>
                </header>
                <main className="max-w-[600px] w-full mx-auto rounded-lg shadow-md bg-white dark:bg-dark-card mt-6 p-4">
                  {children}
                </main>
              </div>
            </Providers>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
