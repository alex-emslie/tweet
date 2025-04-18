'use server';

import { prisma } from '../lib/prisma';

export async function toggleLike(postId: string, userId: string) {
  const existingLike = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
    return false;
  } else {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
    return true;
  }
}

export async function getLikeCount(postId: string) {
  const count = await prisma.like.count({
    where: {
      postId,
    },
  });
  return count;
}

export async function isLikedByUser(postId: string, userId: string) {
  const like = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });
  return !!like;
}

export async function createPost(content: string, authorId: string) {
  const post = await prisma.post.create({
    data: {
      content,
      authorId,
    },
    include: {
      author: true,
      likes: true,
    },
  });
  return post;
}

export async function getPost(postId: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
      likes: true,
    },
  });
  return post;
} 