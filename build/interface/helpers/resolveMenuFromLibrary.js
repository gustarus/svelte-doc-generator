import convertCamelToCode from './convertCamelToCode';

export default function resolveMenuFromLibrary(index, basePath = '/') {
  const menu = index.map(({ name }) => ({
    path: basePath + convertCamelToCode(name) + '/',
    label: name,
  }));

  menu.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

  return menu;
}
