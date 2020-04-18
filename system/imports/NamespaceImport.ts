import Base from '../base/Base';
import { ImportNamespaceSpecifier, ImportSpecifier } from 'estree';
import BaseImport from './BaseImport';

export namespace NamespaceImportSpace {
  export type Config = {
    specifier: ImportNamespaceSpecifier;
  };
}

export default class NamespaceImport extends BaseImport<NamespaceImportSpace.Config> {

  public specifier: ImportNamespaceSpecifier;

  public resolveTags(namePath: string[]): string[] {
    return this.resolveTagReplacements(this.specifier.local.name, namePath);
  }
}
