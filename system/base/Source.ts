import * as path from 'path';
import Base from '../base/Base';
import * as fs from 'fs';
import DOMParser from 'dom-parser';

export namespace SourceSpace {
  export type Config = {
    path: string;
  }

  export type Position = {
    line: number;
    column: number;
  }
}

export default abstract class Source<C> extends Base<SourceSpace.Config & C> {

  private _path: string;

  private _source?: string;

  private _dom?: DOMParser.Dom;

  public set path(value: string) {
    this._path = path.resolve(value);
  }

  public get path(): string {
    return this._path;
  }

  public get source(): string {
    if (!this._source) {
      this._source = fs.readFileSync(this.path).toString();
    }

    return this._source;
  }

  public set source(content: string) {
    this._source = content;
    this.save();
  }

  public get dom(): DOMParser.Dom {
    if (!this._dom) {
      const parser = new DOMParser();
      this._dom = parser.parseFromString(this.source);
    }

    return this._dom;
  }

  public save() {
    fs.writeFileSync(this.path, this.source);
    this.reset();
  }

  public reset() {
    delete this._source;
    delete this._dom;
  }

  public getPosition(position: number): SourceSpace.Position {
    const part = this.source.substr(0, position);
    const lines = part.split('\n');

    const line = lines.length;
    const column = lines[lines.length - 1].length;
    return { line, column };
  }
}
