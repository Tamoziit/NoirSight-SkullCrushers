import { CodeBlockProps } from '@/types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language }: CodeBlockProps) => {
    return (
        <SyntaxHighlighter language={language} style={oneDark} wrapLines wrapLongLines>
            {code}
        </SyntaxHighlighter>
    )
}

export default CodeBlock;