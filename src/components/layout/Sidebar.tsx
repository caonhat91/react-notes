import { useEffect, useState } from 'react';
import tree from '../../assets/markdownMap.json';
import type { TreeNode } from '../../utils/scanMarkdownFiles';
import './Sidebar.css'; // Assuming you have some CSS for styling

type Props = {
    onSelect: (filePath: string) => void;
};

function getTree(): TreeNode[] {
    // Sort folders first, then files, both alphabetically by name
    function cleanAndSort(nodes: TreeNode[]): TreeNode[] {
        return nodes
            .map(node => {
                node.name = node.name.replace('.md', '').replace(/-+/g, ' ');
                if (node.type === 'folder') {
                    node.children = cleanAndSort(node.children);
                }
                return node;
            })
            .sort((a, b) => {
                if (a.type !== b.type) {
                    return a.type === 'folder' ? -1 : 1;
                }
                return a.name.localeCompare(b.name);
            });
    }
    return cleanAndSort(tree as TreeNode[]);
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
    current: string | null,
    collapsedFolders: Record<string, boolean>,
    toggleFolder: (path: string) => void
) {
    return (
        <ul className="sidebar-tree">
            {nodes.map((node, i) => {
                // Ensure node.path exists for both folders and files
                const nodePath = `${node.name}-${level}-${i}`;
                if (node.type === 'folder') {
                    const isCollapsed = collapsedFolders[nodePath];
                    return (
                        <li key={nodePath} className="sidebar-folder" style={{ ['--level' as string]: level }}>
                            <span
                                className="sidebar-folder-label"
                                onClick={() => toggleFolder(nodePath)}
                            >
                                {isCollapsed ? '📁' : '📂'}<span>{node.name}</span>
                            </span>
                            {!isCollapsed && renderTree(node.children, level + 1, onSelect, current, collapsedFolders, toggleFolder)}
                        </li>
                    );
                } else {
                    const isActive = current === node.path;
                    return (
                        <li key={nodePath} className="sidebar-file" style={{ ['--level' as string]: level }}>
                            <a
                                className={`sidebar-file-btn${isActive ? ' active' : ''}`}
                                onClick={() => onSelect(node.path)}
                            >
                                📄<span>{node.name}</span>
                            </a>
                        </li>
                    );
                }
            })}
        </ul>
    );
}

export default function Sidebar({ onSelect }: Props) {
    const [current, setCurrent] = useState<string | null>(null);
    const [collapsedFolders, setCollapsedFolders] = useState<Record<string, boolean>>({});

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

    const toggleFolder = (path: string) => {
        setCollapsedFolders(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    };

    return (
        <nav className='sidebar'>
            <h1 className="sidebar-title">React Notes</h1>
            <h6 className='sidebar-subtitle'>nick.nguyen<br />caonhat91@gmail.com</h6>
            {renderTree(
                getTree(),
                0,
                handleSelect,
                current,
                collapsedFolders,
                toggleFolder
            )}
        </nav>
    );
}
