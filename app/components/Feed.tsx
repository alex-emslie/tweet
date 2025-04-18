'use client';

import Tweet from './Tweet';

const MOCK_TWEETS = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      handle: 'sarahcodes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    content: '🚀 Just shipped a major feature using Next.js and Typescript! The type safety is amazing. Who else is loving the new Next.js features? #webdev #typescript',
    timestamp: '10m',
    likes: 142
  },
  {
    id: '2',
    author: {
      name: 'Tech Weekly',
      handle: 'techweekly',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tech'
    },
    content: 'Breaking: AI models are getting increasingly better at coding. What does this mean for developers? 🤖\n\nShare your thoughts! #AI #coding #futureofwork',
    timestamp: '45m',
    likes: 283
  },
  {
    id: '3',
    author: {
      name: 'Alex Chen',
      handle: 'alexdev',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    content: '💡 Pro tip: Use the useCallback hook in React only when it is actually needed for performance optimization. Over-optimization is a real thing!',
    timestamp: '2h',
    likes: 89
  },
  {
    id: '4',
    author: {
      name: 'Maria Garcia',
      handle: 'mariagarcia',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
    },
    content: 'Just started learning Rust 🦀 Coming from JavaScript, the compiler feels like having a very strict but helpful mentor! Any tips from Rust developers?',
    timestamp: '3h',
    likes: 167
  },
  {
    id: '5',
    author: {
      name: 'Dev Community',
      handle: 'devcommunity',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevCom'
    },
    content: '📢 Reminder: Being a good developer is not about knowing everything, but knowing how to find answers and learn quickly.\n\nRT if you agree! #coding #learning',
    timestamp: '5h',
    likes: 521
  }
];

const Feed = () => {
  return (
    <div className="w-[500px] mx-auto bg-white shadow-sm">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <h2 className="text-xl font-bold text-gray-900">Home</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {MOCK_TWEETS.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed; 