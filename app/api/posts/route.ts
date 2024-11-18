import { NextRequest, NextResponse } from 'next/server'
import prismaClient from '@/lib/prismaClient'

export async function GET() {
    try {
        const posts = await prismaClient.post.findMany()
        return NextResponse.json(posts, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Error fetching posts', details: error.message },
            { status: 500 }
        )
    }
}

type PostBody = {
    title: string
    content: string
}

export async function POST(req: NextRequest) {
    try {
        const body: PostBody = await req.json()
        const { title, content } = body

        if (!title || !content) {
            return NextResponse.json(
                { message: 'Title and content are required' },
                { status: 400 }
            )
        }

        const newPost = await prismaClient.post.create({
            data: { title, content },
        })

        return NextResponse.json(newPost, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Error creating post', details: error.message },
            { status: 500 }
        )
    }
}
