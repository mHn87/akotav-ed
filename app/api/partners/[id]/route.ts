import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

// GET single partner
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

    const partner = await prisma.partner.findUnique({
      where: { id }
    })

    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
    }

    return NextResponse.json(partner)
  } catch (error) {
    console.error('Get partner error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch partner' },
      { status: 500 }
    )
  }
}

// PUT update partner
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
    const { title, logoUrl, filename, websiteUrl } = body

    if (!logoUrl || !filename || !websiteUrl) {
      return NextResponse.json(
        { error: 'لوگو و وب‌سایت الزامی هستند' },
        { status: 400 }
      )
    }

    const partner = await prisma.partner.update({
      where: { id },
      data: {
        title: title || null,
        logoUrl,
        filename,
        websiteUrl
      }
    })

    return NextResponse.json(partner)
  } catch (error) {
    console.error('Update partner error:', error)
    return NextResponse.json(
      { error: 'Failed to update partner' },
      { status: 500 }
    )
  }
}

// DELETE partner
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

    await prisma.partner.delete({
      where: { id }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'شرکت همکار با موفقیت حذف شد' 
    })
  } catch (error) {
    console.error('Delete partner error:', error)
    return NextResponse.json(
      { error: 'Failed to delete partner' },
      { status: 500 }
    )
  }
}
