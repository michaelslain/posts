'use client'

import { FC, useState } from 'react'
import styles from './page.module.scss'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import sleep from '@/util/sleep'

const Page: FC = () => {
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })
            const data = await response.json()

            if (!response.ok) {
                toast.error(data.error)
                return
            }

            toast.success('Logged in successfully, you have 1 hour')

            await sleep(3000)

            router.push('/posts/create')
        } catch (error) {
            toast.error('Internal server error')
        }
    }

    return (
        <div className={styles.container}>
            <Heading>Login</Heading>
            <Input label="password" value={password} onChange={setPassword} />
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

export default Page
