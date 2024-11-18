import { FC } from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'

export type ButtonType = {
    onClick?: () => void
    children: string
    className?: string
}

const Button: FC<ButtonType> = ({
    onClick = () => {},
    children,
    className,
}) => {
    return (
        <button
            {...{ onClick }}
            className={classNames(styles.button, className)}
        >
            {children}
        </button>
    )
}

export default Button
