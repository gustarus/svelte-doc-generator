import { SourceLocation } from 'estree';
import Base from '../base/Base';
export declare namespace LocationSpace {
    type Config = {
        data: SourceLocation;
    };
    type Result = SourceLocation;
}
export default class Location extends Base<LocationSpace.Config> {
    data: SourceLocation;
    get result(): LocationSpace.Result;
}
