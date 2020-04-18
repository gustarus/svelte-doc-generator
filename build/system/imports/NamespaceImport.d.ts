import { ImportNamespaceSpecifier } from 'estree';
import BaseImport from './BaseImport';
export declare namespace NamespaceImportSpace {
    type Config = {
        specifier: ImportNamespaceSpecifier;
    };
}
export default class NamespaceImport extends BaseImport<NamespaceImportSpace.Config> {
    specifier: ImportNamespaceSpecifier;
    resolveTags(namePath: string[]): string[];
}
