import { FC } from 'react'
import styles from './page.module.scss'
import prismaClient from '@/lib/prismaClient'
import EditablePost from '@/components/EditablePost'

const Page: FC = async () => {
    const posts = await prismaClient.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div className={styles.container}>
            {posts.map(post => (
                <EditablePost key={post.id} {...post} />
            ))}
        </div>
    )
}

export default Page
