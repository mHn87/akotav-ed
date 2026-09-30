import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mockPages } from '@/lib/mock-data'

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
    // در صورت خطا، داده‌های mock را برگردان
    const { key } = await params
    const mockPage = mockPages[key as keyof typeof mockPages]
    
    if (mockPage) {
      return NextResponse.json(mockPage)
    }
    
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }
}
