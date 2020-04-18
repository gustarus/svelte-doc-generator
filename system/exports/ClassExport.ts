import Base from '../base/Base';
import { ClassDeclaration, ExportNamedDeclaration, Node } from 'estree';
import BaseExport, { BaseExportSpace } from './BaseExport';
import { FunctionExportSpace } from './FunctionExport';

export namespace ClassExportSpace {
  export type Config = {};

  export type Result = {};
}

export default class ClassExport extends BaseExport<ClassExportSpace.Config> {

  public get declaration(): ClassDeclaration {
    throw new ReferenceError('Not implemented');
  }

  public get name(): string {
    throw new ReferenceError('Not implemented');
  }

  public get result(): BaseExportSpace.Result {
    throw new ReferenceError('Not implemented');
  }
}
