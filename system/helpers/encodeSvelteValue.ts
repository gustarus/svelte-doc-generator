export default function encodeSvelteValue(source: string): string {
  return source
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;');
}
