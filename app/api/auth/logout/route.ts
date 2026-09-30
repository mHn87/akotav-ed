import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/auth'

export async function POST() {
  try {
    await deleteSession()
    return NextResponse.json({ success: true, message: 'خروج موفقیت‌آمیز بود' })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'خطا در خروج از سیستم' },
      { status: 500 }
    )
  }
}
