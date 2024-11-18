'use client'

import { FC } from 'react'
import buttonStyles from './Button.module.scss'
import styles from './LinkButton.module.scss'
import classNames from 'classnames'
import Link from 'next/link'

export type LinkButtonProps = {
    href: string
    onClick?: () => void
    children: string
    className?: string
}

const LinkButton: FC<LinkButtonProps> = ({
    onClick = () => {},
    children,
    className,
    href,
}) => {
    return (
        <Link {...{ href }}>
            <button
                {...{ onClick }}
                className={classNames(
                    buttonStyles.button,
                    styles.button,
                    className
                )}
            >
                {children}
            </button>
        </Link>
    )
}

export default LinkButton
