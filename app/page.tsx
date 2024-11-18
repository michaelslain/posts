import { FC } from 'react'
import styles from './page.module.scss'
import prismaClient from '@/lib/prismaClient'
import Post from '@/components/Post'

const Page: FC = async () => {
    const posts = await prismaClient.post.findMany()

    return <div className={styles.container}>
        {posts.map((post) => <Post key={post.id} {...post} />)}
    </div>
}

export default Page
