import SvelteSource from '../base/SvelteSource';
import InlineComponent from 'svelte/types/compiler/compile/nodes/InlineComponent';
import AttributeNode from 'svelte/types/compiler/compile/nodes/Attribute';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';
export declare namespace BasePartialSpace {
    type Config = {
        node: InlineComponent;
    };
    type Generated = {
        variables: Variable[];
        code: string;
    };
}
export default abstract class BasePartial<C> extends SvelteSource<BasePartialSpace.Config & C> {
    static alias: string;
    private _id;
    node: InlineComponent;
    get id(): string;
    get start(): number;
    get end(): number;
    static get tag(): string;
    get code(): string;
    get content(): string;
    get slot(): string | undefined;
    generate(variables?: Variable[], attributes?: Attribute[]): BasePartialSpace.Generated;
    generateSlot(content: string): string;
    generateTag(customAttributes?: Attribute[]): string;
    extractNativeAttribute(name: string): string | undefined;
    getNativeAttribute(name: string): AttributeNode | undefined;
    getNativeAttributeAsString(name: string): string;
}
