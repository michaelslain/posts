import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {
    if (req.method === 'GET' && req.nextUrl.pathname !== '/posts/create')
        return NextResponse.next()

    const token = req.cookies.get('token')?.value
    console.log('Token:', token)

    if (!token)
        return NextResponse.json(
            { error: 'Unauthorized: No token provided' },
            { status: 401 }
        )

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(token, secret)

        if (!(payload as any).admin) {
            return NextResponse.json(
                { error: 'Forbidden: Admin access required' },
                { status: 403 }
            )
        }

        return NextResponse.next()
    } catch (error) {
        console.error('JWT verification error:', error)
        return NextResponse.json(
            { error: 'Unauthorized: Invalid or expired token' },
            { status: 403 }
        )
    }
}

export const config = {
    matcher: ['/api/posts/:path*', '/posts/create'],
}
