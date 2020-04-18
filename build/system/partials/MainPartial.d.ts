import BasePartial, { BasePartialSpace } from './BasePartial';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';
export declare namespace MainPartialSpace {
    type Config = {};
}
export default class MainPartial extends BasePartial<MainPartialSpace.Config> {
    static get tag(): string;
    generate(variables?: Variable[], attributes?: Attribute[], withContent?: boolean): BasePartialSpace.Generated;
}
