import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mockBanners } from '@/lib/mock-data'

// GET all banners (public - no auth required)
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json(banners)
  } catch (error) {
    console.error('Get public banners error:', error)
    // در صورت خطا، داده‌های mock را برگردان
    return NextResponse.json(mockBanners)
  }
}
