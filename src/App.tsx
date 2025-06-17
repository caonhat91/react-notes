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
                gap: 16px;
            }
            .main-content {
                flex: 1;
                padding: 0 2rem;
                border-left: 0.002em solid var(--menu-active-background-color, #718096);
            }
            .breadcrumb {
                padding: 1rem;
                font-size: .8em;
                text-transform: capitalize;
                flex-shrink: 0;
                color: var(--text-color, #333);
                border-bottom: 1px solid var(--menu-active-background-color, #718096);
                letter-spacing: 0.02em;
            }
        `}</style>
        <div className="app-container">
            <Sidebar onSelect={setFilePath} />
            <main className="main-content">
                <div className='breadcrumb'
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
            </main>
        </div>
    </>);
}

export default App;
