const mdModules = import.meta.glob('../assets/docs/**/*.md', { query: '?raw', import: 'default' });
// This utility function retrieves a list of markdown files and their metadata
// from the specified directory, allowing for dynamic loading of markdown content.
// It uses Vite's glob import feature to load all markdown files in the 'docs' directory.
// The returned list includes the file path, parts of the path, the name of the file,
// and a loader function that returns the content of the markdown file as a string.
// This is useful for building a sidebar or navigation structure in a React application
// that displays markdown documentation files.
// This file is part of the React Noted project, which provides a simple way to view markdown files in a React application.

export const getMarkdownList = () => {
    // Import all markdown files from the specified directory
    // and return them as an array of objects with metadata.
    if (Object.keys(mdModules).length === 0) {
        console.warn('No markdown files found in ../assets/docs/');
        return [];
    }
    // Map over the imported markdown modules to create a structured list
    // Each entry includes the file path, parts of the path, name, and a loader function.
    // The loader function returns a promise that resolves to the content of the markdown file.
    // The path is cleaned up to remove the base directory and file extension.
    // The parts array is created by splitting the cleaned path.
    // The name is the last part of the path, which is typically the file name without the extension.
    return Object.entries(mdModules)
        .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
        .map(([path, loader]) => {
            const parts = path
                .replace('../assets/docs/', '')
                .replace('.md', '')
                .split('/');

            return {
                path,
                parts,
                name: parts[parts.length - 1],
                loader,
            };
        });
};
