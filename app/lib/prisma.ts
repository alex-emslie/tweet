import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export { prisma }; 