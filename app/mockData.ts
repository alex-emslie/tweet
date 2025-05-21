import { PostData } from './types';

const mockAuthors = [
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
    name: 'Alex Johnson',
    handle: 'alexj',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  },
  {
    name: 'Sarah Wilson',
    handle: 'sarahw',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    name: 'Mike Brown',
    handle: 'mikeb',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
  }
];

const mockPosts: PostData[] = [
  {
    id: '1',
    author: mockAuthors[0],
    content: 'Just launched my new website! Check it out and let me know what you think. #webdev #coding',
    timestamp: '2h',
    likes: 42
  },
  {
    id: '2',
    author: mockAuthors[1],
    content: 'Beautiful day for a hike! 🏔️ #nature #outdoors',
    timestamp: '3h',
    likes: 28
  },
  {
    id: '3',
    author: mockAuthors[2],
    content: 'Working on some exciting new features for our app. Can\'t wait to share more details soon! 💻 #tech #development',
    timestamp: '5h',
    likes: 15
  },
  {
    id: '4',
    author: mockAuthors[3],
    content: 'Just finished reading "The Pragmatic Programmer". Highly recommend it to all developers out there! 📚 #programming #books',
    timestamp: '1d',
    likes: 56
  },
  {
    id: '5',
    author: mockAuthors[4],
    content: 'Who else is excited for the new season of their favorite show? 🎬 #entertainment',
    timestamp: '2d',
    likes: 33
  },
  {
    id: '6',
    author: mockAuthors[0],
    content: 'Just completed a 10km run! Feeling great and ready to tackle the day. 🏃‍♂️ #fitness #running',
    timestamp: '3d',
    likes: 47
  },
  {
    id: '7',
    author: mockAuthors[1],
    content: 'Trying out a new recipe for dinner tonight. Wish me luck! 🍳 #cooking #foodie',
    timestamp: '4d',
    likes: 22
  },
  {
    id: '8',
    author: mockAuthors[2],
    content: 'Just deployed a major update to our production environment. Everything is running smoothly! 🚀 #devops #deployment',
    timestamp: '5d',
    likes: 38
  },
  {
    id: '9',
    author: mockAuthors[3],
    content: 'Attending a great tech conference today. So many interesting talks and amazing people! 🎤 #tech #conference',
    timestamp: '6d',
    likes: 29
  },
  {
    id: '10',
    author: mockAuthors[4],
    content: 'Finally got my hands on the new gaming console. Time to dive into some epic adventures! 🎮 #gaming',
    timestamp: '1w',
    likes: 64
  }
];

export { mockPosts, mockAuthors }; 