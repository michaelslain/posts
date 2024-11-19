import { FC } from 'react'
import styles from './Markdown.module.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

type MarkdownProps = {
    children: string
}

const Markdown: FC<MarkdownProps> = ({ children }) => (
    <ReactMarkdown
        className={styles.container}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
    >
        {children}
    </ReactMarkdown>
)

export default Markdown
