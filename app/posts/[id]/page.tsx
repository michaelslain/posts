import { FC } from 'react'
import styles from './page.module.scss'
import prismaClient from '@/lib/prismaClient'
import { notFound } from 'next/navigation'
import Heading from '@/components/Heading'
import P from '@/components/P'
import LinkButton from '@/components/LinkButton'
import dateStringify from '@/util/dateStringify'
import Markdown from '@/components/Markdown'

type PageProps = {
    params: {
        id: string
    }
}

const Page: FC<PageProps> = async ({ params: { id } }) => {
    const post = await prismaClient.post.findUnique({
        where: {
            id,
        },
    })

    if (!post) notFound()

    const { title, content, createdAt } = post
    const dateString = dateStringify(createdAt)

    return (
        <div className={styles.container}>
            <LinkButton href="/">Go back to Home</LinkButton>
            <Heading size="large">{title}</Heading>
            <P>{dateString}</P>
            <Markdown>{content}</Markdown>
        </div>
    )
}

export default Page
