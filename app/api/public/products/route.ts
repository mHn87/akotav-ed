import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mockProducts, mockCategories } from '@/lib/mock-data'

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
    // در صورت خطا، داده‌های mock را برگردان
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    
    let filteredProducts = mockProducts
    if (categoryId) {
      filteredProducts = mockProducts.filter(
        p => p.categoryId === categoryId
      )
    }
    
    // اضافه کردن اطلاعات دسته‌بندی و media به محصولات
    const productsWithCategory = filteredProducts.map(product => ({
      ...product,
      category: mockCategories.find(c => c.id === product.categoryId),
      media: product.imageUrl ? [
        {
          id: `${product.id}-media-1`,
          type: 'image',
          url: product.imageUrl,
          isMain: true,
          createdAt: product.createdAt
        }
      ] : []
    }))
    
    return NextResponse.json(productsWithCategory)
  }
}
