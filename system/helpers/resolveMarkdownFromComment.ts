export default function resolveMarkdownFromComment(value: string): string {
  return value
    // remove trailing stars
    .replace(/^\*+/, '')
    .replace(/\*+$/, '')
    .replace(/\n\*/g, '\n')
    // remove trailing new lines
    .replace(/^\n+/, '')
    .replace(/\n+$/, '')
    // remove trailing spaces before every line
    .replace(/\n\s+/g, '\n')
    // replace new lines with markdown new lines
    .replace(/\n/g, '  \n')
    // remove trailing spaces
    .trim();
}
