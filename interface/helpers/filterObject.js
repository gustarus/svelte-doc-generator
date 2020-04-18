export default function filterObject(data, filter) {
  const names = Object.keys(data);
  const filtered = names.filter((name) => filter(name, data[name]));
  return filtered.reduce((stack, name) => {
    stack[name] = data[name];
    return stack;
  }, {});
}
