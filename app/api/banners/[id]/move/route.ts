import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

// POST move banner up or down
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { direction } = body // 'up' or 'down'

    const currentBanner = await prisma.banner.findUnique({
      where: { id }
    })

    if (!currentBanner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    if (direction === 'up') {
      // Find banner with order just below current
      const aboveBanner = await prisma.banner.findFirst({
        where: {
          order: { lt: currentBanner.order }
        },
        orderBy: { order: 'desc' }
      })

      if (aboveBanner) {
        // Swap orders
        await prisma.$transaction([
          prisma.banner.update({
            where: { id: currentBanner.id },
            data: { order: aboveBanner.order }
          }),
          prisma.banner.update({
            where: { id: aboveBanner.id },
            data: { order: currentBanner.order }
          })
        ])
      }
    } else if (direction === 'down') {
      // Find banner with order just above current
      const belowBanner = await prisma.banner.findFirst({
        where: {
          order: { gt: currentBanner.order }
        },
        orderBy: { order: 'asc' }
      })

      if (belowBanner) {
        // Swap orders
        await prisma.$transaction([
          prisma.banner.update({
            where: { id: currentBanner.id },
            data: { order: belowBanner.order }
          }),
          prisma.banner.update({
            where: { id: belowBanner.id },
            data: { order: currentBanner.order }
          })
        ])
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Move banner error:', error)
    return NextResponse.json(
      { error: 'Failed to move banner' },
      { status: 500 }
    )
  }
}
