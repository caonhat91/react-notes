// utils/markdownToHtml.ts
import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
    const file = await unified()
        .use(remarkParse)         // Parse markdown syntax
        .use(remarkGfm)           // Support GitHub Flavored Markdown (GFM)
        .use(remarkRehype)        // Convert to HTML syntax tree
        .use(rehypeSanitize)      // Sanitize HTML to prevent XSS
        .use(rehypeStringify)     // Stringify to HTML
        .process(markdown);

    return file.toString();
}
