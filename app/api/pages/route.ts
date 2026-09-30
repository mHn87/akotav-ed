import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

// GET all pages
export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const pages = await prisma.page.findMany({
      orderBy: {
        key: 'asc'
      }
    })

    // Initialize pages if they don't exist
    if (pages.length === 0) {
      const aboutPage = await prisma.page.create({
        data: {
          key: 'about',
          titleFa: 'درباره ما',
          titleEn: 'About Us',
          contentFa: '<p>محتوای صفحه درباره ما</p>',
          contentEn: '<p>About us page content</p>',
        }
      })

      const contactPage = await prisma.page.create({
        data: {
          key: 'contact',
          titleFa: 'تماس با ما',
          titleEn: 'Contact Us',
          contentFa: '<p>محتوای صفحه تماس با ما</p>',
          contentEn: '<p>Contact us page content</p>',
        }
      })

      return NextResponse.json([aboutPage, contactPage])
    }

    return NextResponse.json(pages)
  } catch (error) {
    console.error('Get pages error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}
