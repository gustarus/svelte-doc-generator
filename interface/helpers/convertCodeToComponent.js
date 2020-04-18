export default function convertCodeToComponent(string) {
  const componentCase = string[0].toUpperCase() + string.substr(1);
  return componentCase.replace(/-([a-z])/g, (_, a) => a.toUpperCase());
}
