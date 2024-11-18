import { FC, ReactNode } from 'react'
import styles from './Heading.module.scss'
import classNames from 'classnames'

export type HeadingProps = {
    children: ReactNode
    size?: 'small' | 'medium' | 'large'
}

const Heading: FC<HeadingProps> = ({ children, size = 'large' }) => {
    const className = classNames(styles.heading, styles[size])

    switch (size) {
        case 'small':
            return <h3 {...{ className }}>{children}</h3>
        case 'medium':
            return <h2 {...{ className }}>{children}</h2>
        case 'large':
            return <h1 {...{ className }}>{children}</h1>
    }
}

export default Heading
