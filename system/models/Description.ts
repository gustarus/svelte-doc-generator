import { Declaration, ExportNamedDeclaration, Node } from 'estree';
import { Script as SvelteScript, Var } from 'svelte/types/compiler/interfaces';
import Base from '../base/Base';
import FunctionExport, { FunctionExportSpace } from '../exports/FunctionExport';
import VariableExport, { VariableExportSpace } from '../exports/VariableExport';
import ClassExport, { ClassExportSpace } from '../exports/ClassExport';
import { ExportType } from '../types/ExportType';
import { BaseExportSpace } from '../exports/BaseExport';
import { ExportResultType } from '../types/ExportResultType';
import resolveMarkdownFromComment from '../helpers/resolveMarkdownFromComment';

export namespace DescriptionSpace {
  export type Config = {
    comments: Data[];
  }

  export type Data = {
    type: string;
    value: string;
  }
}

export default class Description extends Base<DescriptionSpace.Config> {

  public comments: DescriptionSpace.Data[];

  public get markdown(): string {
    const strings = this.comments.map((comment) => comment.value);
    return strings.map(resolveMarkdownFromComment).join('  \n');
  }
}
