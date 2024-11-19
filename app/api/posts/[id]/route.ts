import { NextRequest, NextResponse } from 'next/server'
import prismaClient from '@/lib/prismaClient'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params

    try {
        const post = await prismaClient.post.findUnique({
            where: { id },
        })

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(post, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Error fetching post', details: error.message },
            { status: 500 }
        )
    }
}

type UpdatePostBody = {
    title?: string
    content?: string
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params

    try {
        const body: UpdatePostBody = await req.json()
        const { title, content } = body

        const updatedPost = await prismaClient.post.update({
            where: { id },
            data: { title, content },
        })

        return NextResponse.json(updatedPost, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Error updating post', details: error.message },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params

    try {
        const deletedPost = await prismaClient.post.delete({
            where: { id },
        })

        return NextResponse.json(deletedPost, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Error deleting post', details: error.message },
            { status: 500 }
        )
    }
}
