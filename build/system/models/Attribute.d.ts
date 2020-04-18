import Base from '../base/Base';
export declare namespace AttributeSpace {
    type Config = {
        name: string;
        value: any;
    };
}
export default class Attribute extends Base<AttributeSpace.Config> {
    name: string;
    value: any;
    get raw(): string;
    get compiled(): string;
}
