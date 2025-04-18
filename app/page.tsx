import Header from './components/Header';
import Feed from './components/Feed';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-2xl mx-auto">
        <Feed />
      </main>
    </div>
  );
}
