import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type PostBody = {
    password: string
}

export async function POST(req: NextRequest) {
    try {
        const body: PostBody = await req.json()
        const { password } = body

        if (!password) {
            return NextResponse.json(
                { message: 'Password is required' },
                { status: 400 }
            )
        }

        if (!process.env.ADMIN_PASSWORD) {
            console.error(
                'ADMIN_PASSWORD is not defined in the environment variables.'
            )
            return NextResponse.json(
                { error: 'Internal server error: ADMIN_PASSWORD is missing' },
                { status: 500 }
            )
        }

        const matched = await bcrypt.compare(
            password,
            process.env.ADMIN_PASSWORD!
        )

        console.log({ matched, password, process: process.env.ADMIN_PASSWORD })

        if (!matched) {
            return NextResponse.json(
                { error: 'Unauthorized: Invalid password' },
                { status: 401 }
            )
        }

        if (!process.env.JWT_SECRET) {
            console.error(
                'JWT_SECRET is not defined in the environment variables.'
            )
            return NextResponse.json(
                { error: 'Internal server error: JWT_SECRET is missing' },
                { status: 500 }
            )
        }

        const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        })

        const res = NextResponse.json({ message: 'Login successful' })
        res.cookies.set('token', token, {
            maxAge: 60 * 60,
            path: '/',
        })

        return res
    } catch (error) {
        console.error('Error in login handler:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
