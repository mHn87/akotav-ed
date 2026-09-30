import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

// GET all banners
export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const banners = await prisma.banner.findMany({
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json(banners)
  } catch (error) {
    console.error('Get banners error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    )
  }
}

// POST create banner
export async function POST(request: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, imageUrl, filename, linkUrl } = body

    if (!imageUrl || !filename) {
      return NextResponse.json(
        { error: 'تصویر بنر الزامی است' },
        { status: 400 }
      )
    }

    // Get max order
    const maxOrder = await prisma.banner.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const banner = await prisma.banner.create({
      data: {
        title: title || null,
        imageUrl,
        filename,
        linkUrl: linkUrl || null,
        order: (maxOrder?.order || 0) + 1
      }
    })

    return NextResponse.json(banner, { status: 201 })
  } catch (error) {
    console.error('Create banner error:', error)
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500 }
    )
  }
}
