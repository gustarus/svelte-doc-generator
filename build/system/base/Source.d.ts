import Base from '../base/Base';
import DOMParser from 'dom-parser';
export declare namespace SourceSpace {
    type Config = {
        path: string;
    };
    type Position = {
        line: number;
        column: number;
    };
}
export default abstract class Source<C> extends Base<SourceSpace.Config & C> {
    private _path;
    private _source?;
    private _dom?;
    set path(value: string);
    get path(): string;
    get source(): string;
    set source(content: string);
    get dom(): DOMParser.Dom;
    save(): void;
    reset(): void;
    getPosition(position: number): SourceSpace.Position;
}
