import Base from '../base/Base';
export declare namespace VariableSpace {
    type Config = {
        name?: string;
        value: any;
        asPlaceholder?: boolean;
    };
}
export default class Variable extends Base<VariableSpace.Config> {
    private _name;
    value: any;
    asPlaceholder: boolean;
    defaults: {
        value: boolean;
        asPlaceholder: boolean;
    };
    get name(): string;
    set name(value: string);
}
