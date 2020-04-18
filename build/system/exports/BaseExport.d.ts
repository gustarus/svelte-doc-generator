import Base from '../base/Base';
import { Declaration, ExportNamedDeclaration, Node } from 'estree';
import Location from '../models/Location';
export declare namespace BaseExportSpace {
    type Config = {
        data: ExportNamedDeclaration;
    };
    type Result = {};
}
export default abstract class BaseExport<C> extends Base<BaseExportSpace.Config & C> {
    data: ExportNamedDeclaration;
    abstract get declaration(): Declaration;
    abstract get name(): string;
    abstract get result(): BaseExportSpace.Result;
    get location(): Location;
    protected static resolveDefaultValue(node: Node): any;
}
