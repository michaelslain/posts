import { FC, ReactNode } from 'react'
import styles from './P.module.scss'

export type PProps = {
    children: ReactNode
}

const P: FC<PProps> = ({ children }) => {
    return <p className={styles.text}>{children}</p>
}

export default P
