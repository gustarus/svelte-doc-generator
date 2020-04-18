import { parse } from 'svelte/compiler';
import { Ast } from 'svelte/types/compiler/interfaces';
import Source from './Source';
import Script from "../models/Script";

export namespace SvelteComponentSpace {
  export type Config = {}
}

export default abstract class SvelteSource<C> extends Source<SvelteComponentSpace.Config & C> {

  private _module: Script;

  private _instance: Script;

  private _tree?: Ast;

  public get tree(): Ast {
    if (!this._tree) {
      try {
        this._tree = parse(this.source);
      } catch(error) {
        error.message = `Unable to parse svelte component '${this.path}' with an error '${error.message}'`;
        throw error;
      }
    }

    return this._tree;
  }

  public get module(): Script {
    if (!this._module && this.tree.module) {
      this._module = new Script({ path: this.path, data: this.tree.module });
    }

    return this._module;
  }

  public get instance(): Script {
    if (!this._instance && this.tree.instance) {
      this._instance = new Script({ path: this.path, data: this.tree.instance });
    }

    return this._instance;
  }

  public reset() {
    super.reset();
    delete this._tree;
  }
}
