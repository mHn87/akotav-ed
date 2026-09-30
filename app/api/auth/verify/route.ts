import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await verifySession()

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      username: session.username,
    })
  } catch (error) {
    console.error('Verify session error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  }
}
