import './globals.css';
import { Inter } from 'next/font/google';
import AuthButtons from './components/AuthButtons';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Twitter Clone',
  description: 'A Twitter clone built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
