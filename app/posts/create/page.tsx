'use client'

import { FC, useState, ChangeEventHandler, useRef } from 'react'
import { toast } from 'react-toastify'
import styles from './page.module.scss'
import Nullable from '@/types/Nullable.type'
import Markdown from 'react-markdown'
import Button from '@/components/Button'

const Page: FC = () => {
    const [content, setContent] = useState<Nullable<string>>(null)
    const [title, setTitle] = useState<Nullable<string>>(null)

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = e => {
        if (!(e.target.files && e.target.files.length > 0)) return

        const file = e.target.files[0]

        const fileNameWithoutExtension = file.name.replace(/\.md$/, '')
        setTitle(fileNameWithoutExtension)

        const reader = new FileReader()
        reader.onload = () => setContent(reader.result as string)
        reader.readAsText(file)
    }

    const handleClear = () => {
        if (inputRef.current) inputRef.current.value = ''
        setContent(null)
        setTitle(null)
    }

    const handleSubmit = async () => {
        if (!content) {
            toast.error('Please select a file to submit.')
            return
        }

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            })

            if (!res.ok) {
                toast.error(`Failed to submit: ${res.statusText}`)
                return
            }

            const data = await res.json()
            console.log('Submission successful:', data)

            toast.success('Content submitted successfully!')

            handleClear()
        } catch (error) {
            console.error('Submission error:', error)
            toast.error('Failed to submit content.')
        }
    }

    return (
        <div className={styles.container}>
            <input
                type="file"
                accept=".md"
                onChange={handleFileChange}
                ref={inputRef}
            />
            <Button onClick={handleClear}>Clear</Button>
            {content && <Markdown>{content}</Markdown>}
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

export default Page
