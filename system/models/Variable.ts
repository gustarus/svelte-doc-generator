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

export namespace VariableSpace {
  export type Config = {
    name?: string;
    value: any;
    asPlaceholder?: boolean;
  }
}

export default class Variable extends Base<VariableSpace.Config> {

  private _name: string;

  public value: any;

  public asPlaceholder: boolean;

  public defaults = {
    value: false,
    asPlaceholder: false
  };

  public get name(): string {
    if (!this._name) {
      this._name = generateUniqueIdentifier('var${id}');
    }

    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }
}
