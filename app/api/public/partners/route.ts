import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    )
  }
}
