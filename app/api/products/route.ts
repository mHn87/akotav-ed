import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

// GET all products
export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
        media: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST create product
export async function POST(request: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { nameFa, nameEn, descriptionFa, descriptionEn, categoryId, media } = body

    if (!nameFa || !categoryId) {
      return NextResponse.json(
        { error: 'نام فارسی و دسته‌بندی الزامی است' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        nameFa,
        nameEn: nameEn || null,
        descriptionFa: descriptionFa || null,
        descriptionEn: descriptionEn || null,
        categoryId,
        media: {
          create: media || []
        }
      },
      include: {
        category: true,
        media: true
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
