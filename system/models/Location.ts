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

export namespace LocationSpace {
  export type Config = {
    data: SourceLocation;
  }

  export type Result = SourceLocation;
}

export default class Location extends Base<LocationSpace.Config> {

  public data: SourceLocation;

  public get result(): LocationSpace.Result {
    return this.data;
  }
}
