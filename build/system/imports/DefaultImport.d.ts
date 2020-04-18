import { ImportDefaultSpecifier, ImportNamespaceSpecifier } from 'estree';
import BaseImport from './BaseImport';
export declare namespace DefaultImportSpace {
    type Config = {
        specifier: ImportDefaultSpecifier;
    };
}
export default class DefaultImport extends BaseImport<DefaultImportSpace.Config> {
    specifier: ImportNamespaceSpecifier;
    resolveTags(pathName: string[]): string[];
}
