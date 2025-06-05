import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Providers from './components/Providers';

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
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-900">Twitter Clone</h1>
                  </div>
                  <AuthButtons />
                </div>
              </div>
            </header>
            <main className="max-w-7xl w-fit mx-auto rounded-lg shadow-md bg-white mt-6 p-4">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
