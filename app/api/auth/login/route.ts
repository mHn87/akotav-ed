import { NextRequest, NextResponse } from 'next/server'
import { createSession, verifyAdminCredentials } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'نام کاربری و رمز عبور الزامی است' },
        { status: 400 }
      )
    }

    const isValid = await verifyAdminCredentials(username, password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'نام کاربری یا رمز عبور اشتباه است' },
        { status: 401 }
      )
    }

    await createSession(username)

    return NextResponse.json({ success: true, message: 'ورود موفقیت‌آمیز بود' })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'خطا در ورود به سیستم' },
      { status: 500 }
    )
  }
}
