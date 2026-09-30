import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    )
  }
}
