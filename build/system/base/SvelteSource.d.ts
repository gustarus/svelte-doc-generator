import { Ast } from 'svelte/types/compiler/interfaces';
import Source from './Source';
import Script from "../models/Script";
export declare namespace SvelteComponentSpace {
    type Config = {};
}
export default abstract class SvelteSource<C> extends Source<SvelteComponentSpace.Config & C> {
    private _module;
    private _instance;
    private _tree?;
    get tree(): Ast;
    get module(): Script;
    get instance(): Script;
    reset(): void;
}
