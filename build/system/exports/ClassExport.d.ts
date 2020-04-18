import { ClassDeclaration } from 'estree';
import BaseExport, { BaseExportSpace } from './BaseExport';
export declare namespace ClassExportSpace {
    type Config = {};
    type Result = {};
}
export default class ClassExport extends BaseExport<ClassExportSpace.Config> {
    get declaration(): ClassDeclaration;
    get name(): string;
    get result(): BaseExportSpace.Result;
}
