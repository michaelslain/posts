'use client'

import { FC } from 'react'
import styles from './EditablePost.module.scss'
import { Post as PostType } from '@prisma/client'
import Heading from './Heading'
import P from './P'
import dateStringify from '@/util/dateStringify'
import Button from './Button'
import { toast } from 'react-toastify'
import sleep from '@/util/sleep'
import { useRouter } from 'next/navigation'

export type EditablePostProps = PostType

const EditablePost: FC<EditablePostProps> = ({ id, title, createdAt }) => {
    const router = useRouter()

    const stringDate = dateStringify(createdAt)

    const handleEdit = async () => router.push(`/posts/${id}/edit`)

    const handleDelete = async () => {
        const url = `/api/posts/${id}`
        const res = await fetch(url, {
            method: 'DELETE',
        })
        const data = await res.json()

        if (!res.ok) {
            toast.error(
                `Status: ${res.status}, Failed to delete post: ${data.error}`
            )
            return
        }

        toast.success(`Post "${title}" deleted`)
        await sleep(3000)
        window.location.reload()
    }

    return (
        <div className={styles.container}>
            <Heading size="small">{title}</Heading>
            <P>{stringDate}</P>
            <div className={styles.buttonContainer}>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    )
}

export default EditablePost
