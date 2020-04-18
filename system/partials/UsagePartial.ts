import BasePartial from './BasePartial';

export namespace UsagePartialSpace {
  export type Config = {}
}

export default class UsagePartial extends BasePartial<UsagePartialSpace.Config> {

  public static get tag(): string {
    return 'Component.Usage';
  }
}
