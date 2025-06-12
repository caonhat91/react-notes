import { useEffect, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import MarkdownViewer from './components/MarkdownViewer';

function App() {
    const [filePath, setFilePath] = useState('');
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

    useEffect(() => {
        setBreadcrumb(filePath.replace('/docs/', '').replace('.md', '').split('/'));
    }, [filePath]);

    return (<>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.2.0/github-markdown.min.css"
        />

        <style>{`
            .app-container {
                display: flex;
                height: 100vh;
                overflow: 'hidden'
            }
            .main-content {
                flex: 1;
                display: 'flex';
                flexDirection: 'column';
                height: '100vh';
                padding: 0 2rem;
            }
        `}</style>
        <div className="app-container">
            <Sidebar onSelect={setFilePath} />
            <div className="main-content">
                <div
                    style={{
                        padding: '1rem',
                        fontSize: '14px',
                        textTransform: 'capitalize',
                        flexShrink: 0,
                        background: 'var(--background-color, #f5f5f5)',
                        color: 'var(--text-color, #333)',
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
                <MarkdownViewer filePath={filePath} />
            </div>
        </div>
    </>);
}

export default App;
