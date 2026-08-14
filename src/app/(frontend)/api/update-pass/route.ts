import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.update({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@gmail.com',
        },
      },
      data: {
        password: 'admin123',
      },
    })

    return NextResponse.json({ success: true, message: 'Password updated', result })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
