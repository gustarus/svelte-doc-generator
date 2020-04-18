import * as fs from 'fs-extra';
import Source from '../base/Source';
import { ItemType } from '../types/ItemType';

export namespace IndexSpace {
  export type Config = {
    items: ItemType[];
  }
}

export default class Dictionary extends Source<IndexSpace.Config> {

  public items: ItemType[];

  public generate() {
    const names = this.items.map(({ name }) => name);
    const imports = this.items.map(({ name }) => `import ${name} from './${name}';`);

    const items = this.items.map(({ name, title }) => {
      const slashed = (title || name).replace(/'/g, '\\\'');
      return `{ name: '${name}', title: '${slashed}', component: ${name} }`;
    });

    const exportDefault = `export default [\n  ${items.join(',\n  ')}\n];`;
    const exportCollection = `export { ${names.join(', ')} };`;

    const content = `${imports.join('\n')}\n\n${exportDefault}\n\n${exportCollection}`;
    fs.writeFileSync(this.path, content);
  }
}
