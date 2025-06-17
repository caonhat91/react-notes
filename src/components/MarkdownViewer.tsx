// components/MarkdownViewer.tsx
import { useEffect, useState } from 'react';
import { convertMarkdownToHtml } from '../utils/markdownToHtml';

type Props = {
    filePath: string;
};

export default function MarkdownViewer({ filePath }: Props) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        fetch(filePath)
            .then(res => res.text())
            .then(convertMarkdownToHtml)
            .then(html => {
                // Tùy chỉnh thẻ <img>
                const div = document.createElement('div');
                div.innerHTML = html;
                div.querySelectorAll('img').forEach(img => {
                    const src = img.getAttribute('src');
                    if (!src) return;
                    if (src.startsWith('http')) return; // Bỏ qua ảnh từ URL bên ngoài
                    const srcParts = src.split('/');
                    const srcDir = srcParts.slice(0, -1).join('/');
                    const srcBase = filePath.split('/').slice(0, -1).join('/');
                    img.src = `${srcBase}/${srcDir}/${srcParts.pop()}`;
                });
                setHtml(div.innerHTML);
            });
    }, [filePath]);

    return (
        <>
            <style>{`
                .markdown-body {
                    box-sizing: border-box;
                    min-height: 100vh;
                    padding: 2rem;
                }
                .markdown-body pre,
                .markdown-body code {
                    white-space: pre-wrap !important;
                    word-wrap: break-word !important;
                }
            `}</style>
            <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </>
    );
}
