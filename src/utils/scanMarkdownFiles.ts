// utils/scanMarkdownFiles.ts (Node.js script)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../../public/docs');
const OUTPUT = path.resolve(__dirname, '../assets/markdownMap.json');

type FileNode = {
    type: 'file';
    name: string;
    path: string;
};

type FolderNode = {
    type: 'folder';
    name: string;
    children: TreeNode[];
};

export type TreeNode = FileNode | FolderNode;

function scanDir(dir: string, base = ''): TreeNode[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    return entries.map(entry => {
        const relPath = path.join(base, entry.name);
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            return {
                type: 'folder',
                name: entry.name,
                children: scanDir(fullPath, relPath),
            } as FolderNode;
        } else if (entry.name.endsWith('.md')) {
            return {
                type: 'file',
                name: entry.name,
                path: `/docs/${relPath.replace(/\\/g, '/')}`,
            } as FileNode;
        }
    }).filter(Boolean) as TreeNode[];
}

const tree = scanDir(DOCS_DIR);

fs.writeFileSync(OUTPUT, JSON.stringify(tree, null, 2));
console.log('📁 Markdown file map generated to markdownMap.json');
