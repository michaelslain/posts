'use client'

import { FC } from 'react'
import styles from './Post.module.scss'
import { Post as PostType } from '@prisma/client'
import { useRouter } from 'next/navigation'
import Heading from './Heading'
import P from './P'
import dateStringify from '@/util/dateStringify'

export type PostProps = PostType

const Post: FC<PostProps> = ({ id, title, createdAt }) => {
    const router = useRouter()

    const stringDate = dateStringify(createdAt)

    const handleRedirect = () => router.push(`/posts/${id}`)

    return (
        <div className={styles.container} onClick={handleRedirect}>
            <Heading size="small">{title}</Heading>
            <P>{stringDate}</P>
        </div>
    )
}

export default Post
