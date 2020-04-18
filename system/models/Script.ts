import { Declaration, ExportNamedDeclaration, ImportDeclaration, Node } from 'estree';
import { Script as SvelteScript } from 'svelte/types/compiler/interfaces';
import FunctionExport, { FunctionExportSpace } from '../exports/FunctionExport';
import VariableExport, { VariableExportSpace } from '../exports/VariableExport';
import ClassExport, { ClassExportSpace } from '../exports/ClassExport';
import { ExportType } from '../types/ExportType';
import { ExportResultType } from '../types/ExportResultType';
import SvelteSource from '../base/SvelteSource';
import Source, { SourceSpace } from '../base/Source';
import Base from "../base/Base";
import encodeSpecialChars from "../helpers/encodeSpecialChars";

export namespace ScriptSpace {
  export type Config = {
    data: SvelteScript;
  }

  export type Definition = {
    code: string;
    variables: { [key: string]: VariableExportSpace.Result; };
    functions: { [key: string]: FunctionExportSpace.Result; };
    classes: { [key: string]: ClassExportSpace.Result; };
    start: SourceSpace.Position;
    end: SourceSpace.Position;
  }
}

const declarationsToModels = {
  VariableDeclaration: VariableExport,
  FunctionDeclaration: FunctionExport,
  ClassDeclaration: ClassExport
};

export default class Script extends Source<ScriptSpace.Config> {

  public data: SvelteScript;

  public get exports(): ExportType[] {
    if (!this.data.content || !this.data.content.body) {
      return [];
    }

    const exports: ExportNamedDeclaration[] = this.data.content.body
      .filter((node: Node) => node.type === 'ExportNamedDeclaration') as any[];

    const filtered = exports.filter((node) => node.declaration);

    return filtered.map((node): ExportType => {
      const declaration = node.declaration as Declaration;
      const model = declarationsToModels[declaration.type];
      return new model({ data: node });
    });
  }

  public get imports(): ImportDeclaration[] {
    return this.data.content.body.filter((node) => node.type === 'ImportDeclaration') as ImportDeclaration[];
  }

  public get variables(): VariableExport[] {
    return Script.filterExports(this.exports, VariableExport) as VariableExport[];
  }

  public get functions(): FunctionExport[] {
    return Script.filterExports(this.exports, FunctionExport) as FunctionExport[];
  }

  public get classes(): ClassExport[] {
    return Script.filterExports(this.exports, ClassExport) as ClassExport[];
  }

  public get start(): SourceSpace.Position {
    return this.getPosition(this.data.start);
  }

  public get end(): SourceSpace.Position {
    return this.getPosition(this.data.end);
  }

  public get code(): string {
    return this.source.substr(this.data.start, this.data.end - this.data.start);
  }

  get definition(): ScriptSpace.Definition {
    return {
      code: encodeSpecialChars(this.code),
      variables: Script.collectExports(this.variables) as { [key: string]: VariableExportSpace.Result; },
      functions: Script.collectExports(this.functions) as { [key: string]: FunctionExportSpace.Result; },
      classes: Script.collectExports(this.classes) as { [key: string]: ClassExportSpace.Result; },
      start: this.start,
      end: this.end,
    };
  }

  private static filterExports(exports: ExportType[], type: any) {
    return exports.filter((_export) => _export instanceof type) as ExportType[];
  }

  private static collectExports(exports: ExportType[]): { [key: string]: ExportResultType; } {
    const results: { [key: string]: ExportResultType; } = {};
    for (const _export of exports) {
      results[_export.name] = _export.result;
    }

    return results;
  }
}
