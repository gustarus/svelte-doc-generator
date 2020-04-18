import Base from '../base/Base';
import { ImportSpecifier } from 'estree';
import BaseImport from './BaseImport';

export namespace ImportSpace {
  export type Config = {
    specifier: ImportSpecifier;
  };
}

export default class Import extends BaseImport<ImportSpace.Config> {

  public specifier: ImportSpecifier;

  public resolveTags(namePath: string[]): string[] {
    const base = namePath[0];
    if (this.specifier.imported.name === base) {
      return this.resolveTagReplacements(
        this.specifier.local.name,
        namePath.slice(1)
      );
    }

    return [];
  }
}
