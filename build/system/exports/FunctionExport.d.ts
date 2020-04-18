import parse from 'comment-parser';
import { FunctionDeclaration } from 'estree';
import BaseExport from './BaseExport';
import Description from '../models/Description';
import { LocationSpace } from '../models/Location';
export declare namespace FunctionExportSpace {
    type Config = {};
    type Result = {
        arguments: Argument[];
        description: string | false;
        tags: parse.Tag[];
        location: LocationSpace.Result;
    };
    type Argument = {
        name: string;
        default?: any;
    };
}
export default class FunctionExport extends BaseExport<FunctionExportSpace.Config> {
    get declaration(): FunctionDeclaration;
    get name(): string;
    get jsdoc(): parse.Comment | false;
    get description(): Description | false;
    get tags(): any;
    get arguments(): FunctionExportSpace.Argument[];
    get result(): FunctionExportSpace.Result;
}
