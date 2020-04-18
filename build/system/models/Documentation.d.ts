import Component from './Component';
import SvelteSource from '../base/SvelteSource';
import Package from './Package';
import UsagePartial from '../partials/UsagePartial';
import MainPartial from '../partials/MainPartial';
import { PartialType } from '../types/PartialType';
import Variable from './Variable';
import DescriptionPartial from '../partials/DescriptionPartial';
export declare namespace DocumentationSpace {
    type Config = {
        package: Package;
        component: Component;
    };
}
export default class Documentation extends SvelteSource<DocumentationSpace.Config> {
    package: Package;
    component: Component;
    get title(): string;
    get main(): MainPartial | undefined;
    get description(): DescriptionPartial | undefined;
    get usages(): UsagePartial[];
    get partials(): PartialType[];
    apply(replacement: PartialType): Variable[];
    define(variables: Variable[]): void;
    private findPartials;
    private findPartial;
    private resolveTagAliases;
    private resolveTagAliasesFromScript;
    private static findInlineComponentByTagAliases;
}
