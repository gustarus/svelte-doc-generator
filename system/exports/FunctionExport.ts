import parse from 'comment-parser';
import Base from '../base/Base';
import {
  AssignmentPattern,
  ExportNamedDeclaration,
  FunctionDeclaration,
  Identifier,
  Literal,
  Node,
  ObjectExpression
} from 'estree';
import BaseExport, { BaseExportSpace } from './BaseExport';
import Description from '../models/Description';
import { LocationSpace } from '../models/Location';

export namespace FunctionExportSpace {
  export type Config = {};

  export type Result = {
    arguments: Argument[];
    description: string | false,
    tags: parse.Tag[],
    location: LocationSpace.Result
  };

  export type Argument = {
    name: string;
    default?: any;
  };
}

export default class FunctionExport extends BaseExport<FunctionExportSpace.Config> {

  public get declaration(): FunctionDeclaration {
    return this.data.declaration as FunctionDeclaration;
  }

  public get name(): string {
    return (this.declaration.id as Identifier).name;
  }

  public get jsdoc(): parse.Comment | false {
    if (!this.data.leadingComments) {
      return false;
    }

    // parse only block comments
    const comment = this.data.leadingComments[0];
    if (comment.type !== 'Block') {
      return false;
    }

    // parse only jsdoc comments
    // comment value should be like
    // `*\n* Hello!\n* @returns {string}\n`
    if (!comment.value.match(/^\*[^*]/)) {
      return false;
    }

    // make jsdoc comment block
    const raw = `/*${comment.value}*/`;
    const parsed = parse(raw);
    if (!parsed) {
      return false;
    }

    return parsed[0];
  }

  public get description(): Description | false {
    if (!this.jsdoc) {
      if (!this.data.leadingComments) {
        return false;
      }

      return new Description({ comments: this.data.leadingComments });
    }

    const content = this.jsdoc.description;
    const data = { type: 'Block', value: content };
    return new Description({ comments: [data] });
  }

  public get tags(): any {
    if (!this.jsdoc) {
      return [];
    }

    return this.jsdoc.tags;
  }

  public get arguments(): FunctionExportSpace.Argument[] {
    const declaration = this.data.declaration as FunctionDeclaration;
    if (!declaration.params) {
      return [];
    }

    const args: FunctionExportSpace.Argument[] = [];
    for (const param of declaration.params) {
      let name = '?';
      let value;
      if (param.type === 'Identifier') {
        const identifier = param as Identifier;
        name = identifier.name;
      } else if (param.type === 'AssignmentPattern') {
        const assigment = param as AssignmentPattern;
        const identifier = assigment.left as Identifier;
        name = identifier.name;
        value = FunctionExport.resolveDefaultValue(assigment.right);
      }

      args.push({ name, default: value });
    }

    return args;
  }

  public get result(): FunctionExportSpace.Result {
    return {
      arguments: this.arguments,
      description: this.description && this.description.markdown,
      tags: this.tags,
      location: this.location.result
    };
  }
}
