'use client';

import Post from './Post';
import { PostData } from '../types';

export default function Reply(props: PostData) {
  return <Post {...props} size="small" />;
} 