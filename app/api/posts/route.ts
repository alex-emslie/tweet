import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const posts = await prisma.post.findMany({
      where: userId ? {
        authorId: userId,
      } : undefined,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        likes: true,
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to match the PostData interface
    const transformedPosts = posts.map(post => ({
      id: post.id,
      author: {
        id: post.author.id,
        name: post.author.name || '',
        email: post.author.email || '',
        image: post.author.image || '',
      },
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      likes: post.likes.length,
      replies: post.replies.map(reply => ({
        id: reply.id,
        author: {
          id: reply.author.id,
          name: reply.author.name || '',
          email: reply.author.email || '',
          image: reply.author.image || '',
        },
        content: reply.content,
        createdAt: reply.createdAt.toISOString(),
        likes: reply.likes.length,
      })),
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Error fetching posts' },
      { status: 500 }
    );
  }
} 