import Script, { ScriptSpace } from './Script';
import SvelteSource from '../base/SvelteSource';
import { SourceSpace } from '../base/Source';
import { Script as SvelteScript } from 'svelte/types/compiler/interfaces';

export namespace ComponentSpace {
  export type Config = {
    path: string;
  }

  export type Result = {
    module: ScriptSpace.Definition | undefined;
    instance: ScriptSpace.Definition | undefined;
  }
}

export default class Component extends SvelteSource<ComponentSpace.Config> {

  public get definition(): ComponentSpace.Result {
    return {
      module: this.module
        ? this.module.definition : undefined,
      instance: this.instance
        ? this.instance.definition : undefined
    };
  }
}
