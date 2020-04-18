import BasePartial, { BasePartialSpace } from './BasePartial';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';
import {
  DOCUMENTATION_VARIABLE_DEFINITION,
  DOCUMENTATION_VARIABLE_INITIALIZATION,
  DOCUMENTATION_VARIABLE_RAW
} from '../constants';

export namespace MainPartialSpace {
  export type Config = {}
}

export default class MainPartial extends BasePartial<MainPartialSpace.Config> {

  public static get tag(): string {
    return 'Component';
  }

  public generate(variables: Variable[] = [], attributes: Attribute[] = [], withContent: boolean = true): BasePartialSpace.Generated {
    // use global name to pass source code attribute to the component
    const rawVariable = new Variable({
      name: DOCUMENTATION_VARIABLE_RAW,
      value: undefined,
      asPlaceholder: true
    });

    // use global name to pass definitions attribute to the component
    const definitionVariable = new Variable({
      name: DOCUMENTATION_VARIABLE_DEFINITION,
      value: undefined,
      asPlaceholder: true
    });

    // use global name to pass initialization attribute to the component
    const initializationVariable = new Variable({
      name: DOCUMENTATION_VARIABLE_INITIALIZATION,
      value: undefined,
      asPlaceholder: true
    });

    const rawAttribute = new Attribute({ name: 'raw', value: rawVariable });
    const definitionAttribute = new Attribute({ name: 'definition', value: definitionVariable });
    const initializationAttribute = new Attribute({ name: 'initialization', value: initializationVariable });

    return super.generate(
      [...variables, rawVariable, initializationVariable, definitionVariable],
      [...attributes, rawAttribute, initializationAttribute, definitionAttribute]
    );
  }
}
