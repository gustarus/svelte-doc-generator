import Base from '../base/Base';
import BaseExport, { BaseExportSpace } from './BaseExport';
import {
  FunctionDeclaration,
  Identifier,
  Literal,
  SourceLocation,
  VariableDeclaration,
  VariableDeclarator
} from 'estree';
import Description from '../models/Description';
import Location, { LocationSpace } from '../models/Location';

export namespace VariableExportSpace {
  export type Config = {};

  export type Result = {
    default: any;
    constant: boolean;
    description: string | undefined;
    note: string | undefined;
    location: LocationSpace.Result;
  };
}

export default class VariableExport extends BaseExport<VariableExportSpace.Config> {

  public get declaration(): VariableDeclaration {
    return this.data.declaration as VariableDeclaration;
  }

  public get declarator(): VariableDeclarator {
    return this.declaration.declarations[0] as VariableDeclarator;
  }

  public get kind(): string {
    return this.declaration.kind;
  }

  public get constant(): boolean {
    return this.kind === 'const';
  }

  public get name(): string {
    return (this.declarator.id as Identifier).name;
  }

  public get default(): any {
    if (!this.declarator.init) {
      return undefined;
    }

    return VariableExport.resolveDefaultValue(this.declarator.init);
  }

  public get description(): Description | undefined {
    if (!this.data.leadingComments) {
      return undefined;
    }

    return new Description({ comments: this.data.leadingComments });
  }

  public get note(): Description | undefined {
    if (!this.data.trailingComments) {
      return undefined;
    }

    return new Description({ comments: this.data.trailingComments });
  }

  public get result(): VariableExportSpace.Result {
    return {
      default: this.default,
      constant: this.constant,
      description: this.description && this.description.markdown,
      note: this.note && this.note.markdown,
      location: this.location.result
    };
  }
}
