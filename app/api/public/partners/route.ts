import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mockPartners } from '@/lib/mock-data'

// GET all partners (public - no auth required)
export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(partners)
  } catch (error) {
    console.error('Get public partners error:', error)
    // در صورت خطا، داده‌های mock را برگردان
    return NextResponse.json(mockPartners)
  }
}
