import { FC } from 'react'
import styles from './Input.module.scss'
import P from './P'

export type InputProps = {
    label: string
    value: string
    onChange: (value: string) => void
}

const Input: FC<InputProps> = ({ label, value, onChange }) => {
    return (
        <div className={styles.container}>
            <P>{label}</P>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                className={styles.input}
            />
        </div>
    )
}

export default Input
