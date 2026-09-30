import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma Client only if DATABASE_URL is available
// This allows the app to work with mock data when no database is configured
let prismaInstance: PrismaClient | undefined

try {
  if (process.env.DATABASE_URL) {
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance
    }
  }
} catch (error) {
  console.warn('Prisma Client initialization failed - using mock data mode')
}

// Export a proxy that will always throw errors (caught by API routes)
export const prisma = prismaInstance ?? new PrismaClient()
