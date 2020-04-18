import Base from '../base/Base';
import { BaseModuleSpecifier, Property, MemberExpression } from 'estree';
import Script from "../models/Script";
export declare namespace BaseImportSpace {
    type Config = {
        script: Script;
        specifier: BaseModuleSpecifier;
    };
}
export default abstract class BaseImport<C> extends Base<BaseImportSpace.Config & C> {
    script: Script;
    specifier: BaseModuleSpecifier;
    abstract resolveTags(namePath: string[]): string[];
    resolveTagReplacements(name: string, inner: string[]): string[];
    resolveTagReplacementsFromProperty(property: Property, path: string[]): string[];
    resolveTagNestedPath(memberExpression: MemberExpression, suffix?: string[]): string[];
}
