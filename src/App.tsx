// App.tsx
import { useEffect, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import MarkdownViewer from './components/MarkdownViewer';
import { buildTree } from './utils/BuildTree';
import { getMarkdownList } from './utils/mdFiles';

const tree = buildTree(getMarkdownList());

function App() {
    const [content, setContent] = useState<unknown>(null);
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

    const handleSelect = async (path: string, loader: () => Promise<unknown>) => {
        const text = await loader();
        setContent(text);
        setBreadcrumb(path.replace('../assets/docs/', '').replace('.md', '').split('/'));
    };

    useEffect(() => {
        // Auto load first file
        const first = tree[0]?.children?.[0];
        if (first?.loader) handleSelect(first.path!, first.loader);
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <div style={{ height: '100vh', overflow: 'auto' }}>
                <Sidebar tree={tree} onSelect={handleSelect} currentPath={''} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <div
                    style={{
                        padding: '1rem',
                        fontSize: '14px',
                        textTransform: 'capitalize',
                        flexShrink: 0,
                        color: '#4a5568',
                        borderBottom: '1px solid #e2e8f0',
                        letterSpacing: '0.02em'
                    }}
                >
                    {breadcrumb.map((part, idx) => (
                        <span key={idx}>
                            {idx > 0 && (
                                <span style={{ color: '#a0aec0', margin: '0 4px' }}>/</span>
                            )}
                            <strong style={{ color: idx === breadcrumb.length - 1 ? '#2b6cb0' : '#718096' }}>
                                {part}
                            </strong>
                        </span>
                    ))}
                </div>
                <div style={{ flex: 1, overflow: 'auto' }}>
                    <MarkdownViewer content={content} />
                </div>
            </div>
        </div>
    );
}

export default App;
