import Base from '../base/Base';
import { ClassDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier } from 'estree';
import BaseImport from './BaseImport';

export namespace DefaultImportSpace {
  export type Config = {
    specifier: ImportDefaultSpecifier;
  };
}

export default class DefaultImport extends BaseImport<DefaultImportSpace.Config> {

  public specifier: ImportNamespaceSpecifier;

  public resolveTags(pathName: string[]): string[] {
    throw new ReferenceError('Not implemented');
  }
}
