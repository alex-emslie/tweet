import { PostData } from '../types';

interface JsonPlaceholderPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  login: {
    username: string;
  };
  picture: {
    medium: string;
  };
}

export async function fetchFeedData(): Promise<PostData[]> {
  try {
    // Fetch posts from JSONPlaceholder
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    const posts: JsonPlaceholderPost[] = await postsResponse.json();

    // Fetch users from Random User Generator
    const usersResponse = await fetch('https://randomuser.me/api/?results=10');
    const usersData = await usersResponse.json();
    const users: RandomUser[] = usersData.results;

    // Combine the data
    return posts.map((post, index) => ({
      id: post.id.toString(),
      author: {
        name: `${users[index].name.first} ${users[index].name.last}`,
        handle: users[index].login.username,
        avatar: users[index].picture.medium,
      },
      content: post.body,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      likes: Math.floor(Math.random() * 1000),
      isLiked: false,
      replies: [],
    }));
  } catch (error) {
    console.error('Error fetching feed data:', error);
    return [];
  }
} 