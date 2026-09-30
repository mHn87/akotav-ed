import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

// GET all partners
export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const partners = await prisma.partner.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(partners)
  } catch (error) {
    console.error('Get partners error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    )
  }
}

// POST create partner
export async function POST(request: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, logoUrl, filename, websiteUrl } = body

    if (!logoUrl || !filename) {
      return NextResponse.json(
        { error: 'لوگو الزامی است' },
        { status: 400 }
      )
    }

    const partner = await prisma.partner.create({
      data: {
        title: title || null,
        logoUrl,
        filename,
        websiteUrl: websiteUrl || null
      }
    })

    return NextResponse.json(partner, { status: 201 })
  } catch (error) {
    console.error('Create partner error:', error)
    return NextResponse.json(
      { error: 'Failed to create partner' },
      { status: 500 }
    )
  }
}
