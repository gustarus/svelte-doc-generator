export default function convertCamelToCode(string) {
  const camelCase = string[0].toLowerCase() + string.substr(1);
  return camelCase.replace(/[A-Z]/g, a => `-${a.toLowerCase()}`);
}
