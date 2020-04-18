const hljs = require('highlight.js');

export default function resolveHighlightedSource(source, lang = 'html') {
  // highlight source code
  const highlighted = hljs.highlight(lang, source).value;

  // split source code into lines with indent value
  const lines = highlighted.split('\n').map((line) => {
    const match = line.match(/^([\t\s]*)(.*?)$/);
    const indent = match[1].length;
    const source = match[2];
    return { indent, source };
  });

  // find minimum indent to offset indents
  const filledLines = lines.filter((line) => line.source.replace(/^[\t\s]+/, '').length);
  const minimumIndent = Math.min(...filledLines.map((line) => line.indent));

  // recalculate indents based on offset
  const changedLines = lines.map((line) => {
    const indent = line.indent > minimumIndent
      ? line.indent - minimumIndent : 0;
    return { ...line, indent };
  });

  // mark empty lines at the beginning as empty
  for (let i = 0; i < changedLines.length; i++) {
    if(!changedLines[i].source) {
      changedLines[i] = undefined;
      continue;
    }

    break;
  }

  // mark empty lines at the ending as empty
  for (let i = changedLines.length - 1; i > 0; i--) {
    if(!changedLines[i].source) {
      changedLines[i] = undefined;
      continue;
    }

    break;
  }

  // return only non empty lines
  return changedLines.filter((line) => line);
}
