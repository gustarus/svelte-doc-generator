import * as fs from 'fs-extra';
import * as path from 'path';
import merge from 'deepmerge';
import Component from './Component';
import SvelteSource from '../base/SvelteSource';
import { Ast, Script, TemplateNode } from 'svelte/types/compiler/interfaces';
import Package from './Package';
import { ImportDeclaration, ImportSpecifier } from 'estree';
import Import from '../imports/Import';
import NamespaceImport from '../imports/NamespaceImport';
import DefaultImport from '../imports/DefaultImport';
import UsagePartial from '../partials/UsagePartial';
import Documentation from './Documentation';
import Base from '../base/Base';
import resolveRelativeImports from '../helpers/resolveRelativeImports';
import Variable from './Variable';
import {
  DOCUMENTATION_VARIABLE_DEFINITION,
  DOCUMENTATION_VARIABLE_INITIALIZATION,
  DOCUMENTATION_VARIABLE_RAW
} from "../constants";
import encodeSpecialChars from "../helpers/encodeSpecialChars";

export namespace GeneratorSpace {
  export type Config = {
    name: string;
    package: Package;
    directory: string;
    documentation: Documentation;
  }
}

export default class Generator extends Base<GeneratorSpace.Config> {

  readonly fileNameIndex = 'index.js';
  readonly fileNameDocumentation = 'Documentation.svelte';

  public name: string;

  public package: Package;

  public directory: string;

  public documentation: Documentation;

  public get pathToIndex() {
    return path.resolve(this.directory, this.fileNameIndex);
  }

  public get pathToDocumentation() {
    return path.resolve(this.directory, this.fileNameDocumentation);
  }

  public get variables(): Variable[] {
    const variables = [];

    // retrieve documentation variables
    const raw = encodeSpecialChars(this.documentation.component.source);
    const definition = this.documentation.component.definition;
    const initialization = this.documentation.instance.definition;

    // create variables
    variables.push(new Variable({ name: DOCUMENTATION_VARIABLE_RAW, value: raw }));
    variables.push(new Variable({ name: DOCUMENTATION_VARIABLE_DEFINITION, value: definition }));
    variables.push(new Variable({ name: DOCUMENTATION_VARIABLE_INITIALIZATION, value: initialization }));

    return variables;
  }

  public generate() {
    // reset target documentation file if exists
    fs.writeFileSync(this.pathToDocumentation, this.documentation.source);

    // create documentation clone from cloned file
    const path = this.pathToDocumentation;
    const that = this.documentation.package;
    const component = this.documentation.component;
    const clone = new Documentation({ path, package: that, component });

    // rebind all imports paths and update the file
    clone.source = resolveRelativeImports(clone.source, this.documentation.path, this.pathToDocumentation);

    // replace all partials
    // with generated source code
    // and process variables
    let globalVariables = this.variables;
    for (let i = 0; i < clone.partials.length; i++) {
      const partialVariables = clone.apply(clone.partials[i]);
      globalVariables = [...globalVariables, ...partialVariables];
    }

    // define variables inside the documentation
    clone.define(globalVariables);

    // generate index file
    const content = `import Component from './${this.fileNameDocumentation}';\n\nexport default Component;`;
    fs.writeFileSync(this.pathToIndex, content);
  }
}
