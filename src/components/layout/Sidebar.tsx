import { useState } from "react";

type TreeNode = {
    name: string;
    path?: string;
    loader?: () => Promise<unknown>;
    children?: TreeNode[];
};

interface Props {
    tree: TreeNode[];
    onSelect: (path: string, loader: () => Promise<unknown>) => void;
    currentPath: string;
}


export default function Sidebar({ tree, onSelect, currentPath }: Props) {
    return (
        <div style={{ width: 250, padding: '1rem', borderRight: '1px solid #ccc' }}>
            <h3>📁 React Notes</h3>
            <Tree tree={tree} onSelect={onSelect} currentPath={currentPath} />
        </div>
    );
}

function Tree({
    tree,
    onSelect,
    currentPath,
}: {
    tree: TreeNode[];
    onSelect: Props['onSelect'];
    currentPath: string;
}) {

    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

    const toggleFolder = (name: string) => {
        setOpenFolders((prev) => ({ ...prev, [name]: !prev[name] }));
    };


    return (
        <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
            {tree.map((node) => (
                <li key={node.name}>
                    {node.path ? (
                        <button
                            style={{
                                background: currentPath === node.path ? '#e0f7fa' : 'transparent',
                                fontWeight: currentPath === node.path ? 'bold' : 'normal',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                            }}
                            onClick={() => node.loader && onSelect(node.path!, node.loader)}
                        >
                            📄 {node.name}
                        </button>
                    ) : (
                        <>
                            <div
                                onClick={() => toggleFolder(node.name)}
                                style={{ cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                {openFolders[node.name] ? '📂' : '📁'} {node.name}
                            </div>
                            {node.children && (
                                <Tree tree={node.children} onSelect={onSelect} currentPath={currentPath} />
                            )}
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}
