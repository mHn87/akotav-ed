import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single page by key (public - no auth required)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params

    const page = await prisma.page.findUnique({
      where: { key }
    })

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Get public page error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}
