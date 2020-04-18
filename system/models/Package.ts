import * as fs from 'fs';
import Source from '../base/Source';

export namespace PackageSpace {
  export type Config = {
    path: string;
  };

  export type Data = {
    name: string;
    version: string;
    bin: { [key: string]: string };
  }
}

export default class Package extends Source<PackageSpace.Config> {

  public get data(): PackageSpace.Data {
    const content = fs.readFileSync(this.path).toString();
    return JSON.parse(content);
  }

  public get name(): string {
    return this.data.name;
  }

  public get version(): string {
    return this.data.version;
  }

  public get cli(): string {
    return this.data.bin[this.name];
  }
}
