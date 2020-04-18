import { Declaration, ExportNamedDeclaration, Node, SourceLocation } from 'estree';
import { Script as SvelteScript, Var } from 'svelte/types/compiler/interfaces';
import Base from '../base/Base';
import FunctionExport, { FunctionExportSpace } from '../exports/FunctionExport';
import VariableExport, { VariableExportSpace } from '../exports/VariableExport';
import ClassExport, { ClassExportSpace } from '../exports/ClassExport';
import { ExportType } from '../types/ExportType';
import { BaseExportSpace } from '../exports/BaseExport';
import { ExportResultType } from '../types/ExportResultType';
import { ScriptSpace } from './Script';
import generateUniqueIdentifier from '../helpers/generateUniqueIdentifier';
import Variable from './Variable';

export namespace AttributeSpace {
  export type Config = {
    name: string;
    value: any;
  }
}

export default class Attribute extends Base<AttributeSpace.Config> {

  public name: string;

  public value: any;

  public get raw() {
    return `${this.name}=${this.compiled}`;
  }

  public get compiled() {
    if (this.value instanceof Variable) {
      return `{${this.value.name}}`;
    }

    const formatted = this.value
      .replace(/\n/g, '\\n')
      .replace(/"/g, '\\"');
    return `"${formatted}"`;
  }
}
