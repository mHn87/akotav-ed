import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

// GET single category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Get category error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}

// PUT update category
export async function PUT(
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
    const { nameFa, nameEn } = body

    if (!nameFa || !nameEn) {
      return NextResponse.json(
        { error: 'نام فارسی و انگلیسی الزامی است' },
        { status: 400 }
      )
    }

    // Generate slug from English name
    const slug = nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    // Check if nameEn already exists for another category
    const existingNameEn = await prisma.category.findFirst({
      where: {
        nameEn,
        NOT: { id }
      }
    })

    if (existingNameEn) {
      return NextResponse.json(
        { error: 'این نام انگلیسی قبلاً استفاده شده است' },
        { status: 400 }
      )
    }

    // Check if slug already exists for another category
    const existingSlug = await prisma.category.findFirst({
      where: {
        slug,
        NOT: { id }
      }
    })

    if (existingSlug) {
      return NextResponse.json(
        { error: 'این نام انگلیسی قبلاً استفاده شده است' },
        { status: 400 }
      )
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        nameFa,
        nameEn,
        slug
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Update category error:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

// DELETE category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Delete category (cascade will delete products)
    await prisma.category.delete({
      where: { id }
    })

    return NextResponse.json({ 
      success: true, 
      message: `دسته‌بندی و ${category._count.products} محصول مرتبط حذف شد` 
    })
  } catch (error) {
    console.error('Delete category error:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
