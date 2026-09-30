import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

// GET all categories
export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Get categories error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST create category
export async function POST(request: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { nameFa, nameEn } = body

    if (!nameFa || !nameEn) {
      return NextResponse.json(
        { error: 'نام فارسی و انگلیسی الزامی است' },
        { status: 400 }
      )
    }

    // Generate slug from English name
    const slug = nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    // Check if slug already exists
    const existing = await prisma.category.findUnique({
      where: { slug }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'این نام انگلیسی قبلاً استفاده شده است' },
        { status: 400 }
      )
    }

    // Check if nameEn already exists
    const existingNameEn = await prisma.category.findUnique({
      where: { nameEn }
    })

    if (existingNameEn) {
      return NextResponse.json(
        { error: 'این نام انگلیسی قبلاً استفاده شده است' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        nameFa,
        nameEn,
        slug
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
