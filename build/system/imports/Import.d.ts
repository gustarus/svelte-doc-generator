import { ImportSpecifier } from 'estree';
import BaseImport from './BaseImport';
export declare namespace ImportSpace {
    type Config = {
        specifier: ImportSpecifier;
    };
}
export default class Import extends BaseImport<ImportSpace.Config> {
    specifier: ImportSpecifier;
    resolveTags(namePath: string[]): string[];
}
