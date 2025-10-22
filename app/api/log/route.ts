import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Log to server terminal
    console.log(message)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[LOG API ERROR]', error)
    return NextResponse.json({ error: 'Failed to log message' }, { status: 500 })
  }
}
