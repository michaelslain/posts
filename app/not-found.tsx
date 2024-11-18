import { FC } from 'react'
import styles from './not-found.module.scss'
import Heading from '@/components/Heading'
import P from '@/components/P'
import LinkButton from '@/components/LinkButton'

const NotFound: FC = () => {
    return (
        <div className={styles.container}>
            <Heading size="large">404 - Page Not Found</Heading>
            <P>Sorry, we couldn't find the page you were looking for.</P>
            <LinkButton href="/">Go back to Home</LinkButton>
        </div>
    )
}

export default NotFound
