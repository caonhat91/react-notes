import type { getMarkdownList } from "./mdFiles";

type Node = {
    name: string;
    children?: Node[];
    path?: string;
    loader?: () => Promise<unknown>;
};

export function buildTree(files: ReturnType<typeof getMarkdownList>): Node[] {
    const root: Node[] = [];

    for (const file of files) {
        let current = root;
        file.parts.forEach((part, idx) => {
            let node = current.find((n) => n.name === part);
            if (!node) {
                node = { name: part };
                current.push(node);
            }
            if (idx === file.parts.length - 1) {
                node.path = file.path;
                node.loader = () => file.loader().then(content => {
                    // Ensure the template string is loaded and returned correctly
                    // If you want to extract a specific phrase "a" from the content, do it here
                    // For example, to find the word "a" in the content:
                    // const match = content.match(/a/);
                    // return match ? match[0] : '';
                    // Otherwise, just return the content as string
                    console.log(`Loading content for ${file.path}`, content);
                    return content;
                });
            } else {
                node.children ??= [];
                current = node.children;
            }
        });
    }

    return root;
}
