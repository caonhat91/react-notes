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
                const nodePath = `${node.name}-${level}-${i}`;
                const isFolder = node.type === 'folder';
                const isCollapsed = isFolder ? collapsedFolders[nodePath] : false;
                const isActive = !isFolder && current === node.path;

                return (
                    <li
                        key={nodePath}
                        className={isFolder ? "sidebar-folder" : "sidebar-file"}
                        style={{ ['--level' as string]: level }}
                    >
                        <a
                            className={isFolder ? "sidebar-folder-label" : `sidebar-file-btn${isActive ? ' active' : ''}`}
                            onClick={
                                isFolder
                                    ? () => toggleFolder(nodePath)
                                    : () => onSelect(node.path)
                            }
                        >
                            {isFolder
                                ? (isCollapsed ? '📁' : '📂')
                                : '📄'}
                            <span>{node.name}</span>
                        </a>
                        {isFolder && !isCollapsed &&
                            renderTree(node.children, level + 1, onSelect, current, collapsedFolders, toggleFolder)
                        }
                    </li>
                );
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
