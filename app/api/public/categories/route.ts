import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mockCategories } from '@/lib/mock-data'

// GET all categories (public - no auth required)
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Get public categories error:', error)
    // در صورت خطا، داده‌های mock را برگردان
    return NextResponse.json(mockCategories)
  }
}
