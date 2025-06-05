import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

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
        name: post.author.name || '',
        handle: post.author.email?.split('@')[0] || '',
        avatar: post.author.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'
      },
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      likes: post.likes.length,
      replies: post.replies.map(reply => ({
        id: reply.id,
        author: {
          name: reply.author.name || '',
          handle: reply.author.email?.split('@')[0] || '',
          avatar: reply.author.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'
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