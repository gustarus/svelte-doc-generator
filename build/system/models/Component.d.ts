import { ScriptSpace } from './Script';
import SvelteSource from '../base/SvelteSource';
export declare namespace ComponentSpace {
    type Config = {
        path: string;
    };
    type Result = {
        module: ScriptSpace.Definition | undefined;
        instance: ScriptSpace.Definition | undefined;
    };
}
export default class Component extends SvelteSource<ComponentSpace.Config> {
    get definition(): ComponentSpace.Result;
}
