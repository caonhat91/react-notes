import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MyCustomComponent from './MyCustomComponent';


const componentsMap: Record<string, React.ReactNode> = {
    MyCustomComponent: <MyCustomComponent />,
};

function renderTextWithComponents(text: string): React.ReactNode[] {
    const parts = text.split(/\[([^\]]+)\]/g);
    return parts.map((part, i) =>
        componentsMap[part] ? <React.Fragment key={i}>{componentsMap[part]}</React.Fragment> : part
    );
}

export default function MarkdownViewer({ content }: { content: unknown }) {
    return (
        <div style={{ padding: '1rem' }}>
            <style>
                {`
                .markdown-viewer pre,
                .markdown-viewer code {
                    background: var(--color-background, #f5f5f5);
                    color: var(--color-text, #333);
                    font-family: var(--font-monospace, monospace);
                    font-size: 0.9em;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
                .markdown-viewer pre {
                    border: 1px solid #d0d0d0;
                    border-radius: 6px;
                    padding: 0.75em 1em;
                    overflow-x: auto;
                    margin: 1em 0;
                }
                .markdown-viewer code {
                    border-radius: 4px;
                    padding: 0.2em 0.4em;
                    font-size: 95%;
                }
            `}
            </style>
            <div className="markdown-viewer">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        p: ({ children }) => <div>{renderTextWithComponents(children?.toString() || '')}</div>,
                        h1: (props) => <h1 style={{ color: '#205781' }} {...props} />,
                        img: ({ src = '', alt = '' }) => (
                            <div style={{ textAlign: 'center', margin: '1em 0' }}>
                                {src ? (
                                    <img
                                        src={src}
                                        alt={alt}
                                        style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
                                    />
                                ) : (
                                    <span style={{ color: 'red' }}>Image not found</span>
                                )}
                                {alt && <div style={{ color: '#888', fontSize: 12 }}>{alt}</div>}
                            </div>
                        ),
                    }}
                >
                    {typeof content === 'string' ? content : ''}
                </ReactMarkdown>
            </div>
        </div>
    );
}