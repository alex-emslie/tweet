import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteUser() {
  try {
    // First delete all posts and related data for the user
    const user = await prisma.user.findUnique({
      where: {
        email: 'aremslie@gmail.com'
      },
      include: {
        posts: {
          include: {
            replies: true,
            likes: true
          }
        },
        likes: true
      }
    });

    if (!user) {
      console.log('User not found');
      return;
    }

    // Delete all likes by the user
    await prisma.like.deleteMany({
      where: {
        userId: user.id
      }
    });

    // Delete all replies to the user's posts
    for (const post of user.posts) {
      await prisma.post.deleteMany({
        where: {
          replyToId: post.id
        }
      });
    }

    // Delete all likes on the user's posts
    for (const post of user.posts) {
      await prisma.like.deleteMany({
        where: {
          postId: post.id
        }
      });
    }

    // Delete all posts by the user
    await prisma.post.deleteMany({
      where: {
        authorId: user.id
      }
    });

    // Finally delete the user
    await prisma.user.delete({
      where: {
        id: user.id
      }
    });

    console.log('User and all associated data deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteUser(); 