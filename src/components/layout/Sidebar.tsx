import { useEffect, useState } from 'react';
import tree from '../../assets/markdownMap.json';
import type { TreeNode } from '../../utils/scanMarkdownFiles';
import './Sidebar.css'; // Assuming you have some CSS for styling

type Props = {
    onSelect: (filePath: string) => void;
};

function getTree(): TreeNode[] {
    // Sort folders first, then files, both alphabetically by name
    return [...(tree as TreeNode[])].sort((a, b) => {
        if (a.type !== b.type) {
            return a.type === 'folder' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
    })
}

function findFirstFile(nodes: TreeNode[]): string | null {
    for (const node of nodes) {
        if (node.type === 'file') return node.path;
        if (node.type === 'folder') {
            const found = findFirstFile(node.children);
            if (found) return found;
        }
    }
    return null;
}

function renderTree(
    nodes: TreeNode[],
    level: number = 0,
    onSelect: Props["onSelect"],
    current: string | null
) {

    return (
        <ul className="sidebar-tree">
            {nodes.map((node, i) => {
                if (node.type === 'folder') {
                    return (
                        <li key={i} className="sidebar-folder">
                            <span className="sidebar-folder-label">📁 <span>{node.name}</span></span>
                            {renderTree(node.children, level + 1, onSelect, current)}
                        </li>
                    );
                } else {
                    const isActive = current === node.path;
                    return (
                        <li key={i} className="sidebar-file" style={{ ['--level' as string]: level }}>
                            <button
                                className={`sidebar-file-btn${isActive ? ' active' : ''}`}
                                onClick={() => onSelect(node.path)}
                            >
                                📄 <span>{node.name.replace('.md', '')}</span>
                            </button>
                        </li>
                    );
                }
            })}
        </ul>
    );
}

export default function Sidebar({ onSelect }: Props) {
    const [current, setCurrent] = useState<string | null>(null);

    useEffect(() => {
        const first = findFirstFile(getTree());
        if (first) {
            setCurrent(first);
            onSelect(first);
        }
    }, [onSelect]);

    const handleSelect = (filePath: string) => {
        setCurrent(filePath);
        onSelect(filePath);
    };

    return (
        <nav className='sidebar'>
            <h3 className="sidebar-title">📁 React Notes</h3>
            {renderTree(
                getTree(), 0,
                handleSelect,
                current
            )}
        </nav>
    );
}
