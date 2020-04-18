import BaseExport from './BaseExport';
import { VariableDeclaration, VariableDeclarator } from 'estree';
import Description from '../models/Description';
import { LocationSpace } from '../models/Location';
export declare namespace VariableExportSpace {
    type Config = {};
    type Result = {
        default: any;
        constant: boolean;
        description: string | undefined;
        note: string | undefined;
        location: LocationSpace.Result;
    };
}
export default class VariableExport extends BaseExport<VariableExportSpace.Config> {
    get declaration(): VariableDeclaration;
    get declarator(): VariableDeclarator;
    get kind(): string;
    get constant(): boolean;
    get name(): string;
    get default(): any;
    get description(): Description | undefined;
    get note(): Description | undefined;
    get result(): VariableExportSpace.Result;
}
