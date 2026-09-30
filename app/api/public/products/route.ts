import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all products (public - no auth required)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    const products = await prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: {
        category: true,
        media: {
          orderBy: [
            { isMain: 'desc' },
            { createdAt: 'asc' }
          ]
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Get public products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
