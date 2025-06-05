import { PostData } from './types';

export const mockAuthors = [
  {
    name: 'John Doe',
    handle: 'johndoe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    name: 'Jane Smith',
    handle: 'janesmith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  },
  {
    name: 'Bob Johnson',
    handle: 'bobjohnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob'
  }
];

export const mockPosts: PostData[] = [
  {
    id: '1',
    author: mockAuthors[0],
    content: 'Just launched my new website! Check it out and let me know what you think. #webdev #coding',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 42
  },
  {
    id: '2',
    author: mockAuthors[1],
    content: 'Beautiful day for a hike! 🏔️ #nature #outdoors',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 28
  },
  {
    id: '3',
    author: mockAuthors[2],
    content: 'Just finished reading an amazing book. Highly recommend! 📚',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 15
  },
  {
    id: '4',
    author: mockAuthors[3],
    content: 'Just finished reading "The Pragmatic Programmer". Highly recommend it to all developers out there! 📚 #programming #books',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 56
  },
  {
    id: '5',
    author: mockAuthors[4],
    content: 'Who else is excited for the new season of their favorite show? 🎬 #entertainment',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 33
  },
  {
    id: '6',
    author: mockAuthors[0],
    content: 'Just completed a 10km run! Feeling great and ready to tackle the day. 🏃‍♂️ #fitness #running',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 47
  },
  {
    id: '7',
    author: mockAuthors[1],
    content: 'Trying out a new recipe for dinner tonight. Wish me luck! 🍳 #cooking #foodie',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 22
  },
  {
    id: '8',
    author: mockAuthors[2],
    content: 'Just deployed a major update to our production environment. Everything is running smoothly! 🚀 #devops #deployment',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 38
  },
  {
    id: '9',
    author: mockAuthors[3],
    content: 'Attending a great tech conference today. So many interesting talks and amazing people! 🎤 #tech #conference',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 29
  },
  {
    id: '10',
    author: mockAuthors[4],
    content: 'Finally got my hands on the new gaming console. Time to dive into some epic adventures! 🎮 #gaming',
    createdAt: new Date(Date.now() - 7 * 7 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 64
  }
]; 