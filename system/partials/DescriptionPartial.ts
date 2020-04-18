import BasePartial, { BasePartialSpace } from './BasePartial';
import encodeSpecialChars from '../helpers/encodeSpecialChars';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';

export namespace DescriptionPartialSpace {
  export type Config = {}
}

export default class DescriptionPartial extends BasePartial<DescriptionPartialSpace.Config> {

  public static get tag(): string {
    return 'Component.Description';
  }
}
