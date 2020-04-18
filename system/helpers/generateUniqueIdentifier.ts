let i = 0;

const partial = '${id}';

export default function generateUniqueIdentifier(template: string = `uniq${partial}`): string {
  if (!template.includes(partial)) {
    throw new Error(`Invalid variable template '${template}': should has '${partial}' part`);
  }

  const name = template.replace(partial, i.toString());
  i++;
  return name;
}
