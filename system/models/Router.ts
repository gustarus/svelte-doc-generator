import * as fs from 'fs-extra';
import Source from '../base/Source';
import { ItemType } from '../types/ItemType';

export namespace RouterSpace {
  export type Config = {
    routes: ItemType[];
  }
}

export default class Router extends Source<RouterSpace.Config> {

  public routes: ItemType[];

  public generate() {
    const imports = this.routes.map(({ name }) => `import ${name} from './${name}';`);
    const items = this.routes.map(({ name, title }) => {
      return `{ name: ${JSON.stringify(name)}, title: ${JSON.stringify(title)}, component: ${name} }`;
    });

    const content = `${imports.join('\n')}\n\nexport default [\n  ${items.join(',\n  ')}\n];`;
    fs.writeFileSync(this.path, content);
  }
}
