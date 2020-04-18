import Component from './Component';
import SvelteSource from '../base/SvelteSource';
import { TemplateNode } from 'svelte/types/compiler/interfaces';
import Package from './Package';
import UsagePartial from '../partials/UsagePartial';
import MainPartial from '../partials/MainPartial';
import InlineComponent from 'svelte/types/compiler/compile/nodes/InlineComponent';
import { PartialClassType, PartialType } from '../types/PartialType';
import Variable from './Variable';
import Script from './Script';
import DescriptionPartial from '../partials/DescriptionPartial';
import { IMPORT_SPECIFIER_TO_MODEL } from "../constants";

export namespace DocumentationSpace {
  export type Config = {
    package: Package;
    component: Component;
  }
}

export default class Documentation extends SvelteSource<DocumentationSpace.Config> {

  public package: Package;

  public component: Component;

  public get title(): string {
    if (!this.main) {
      return '';
    }

    return this.main
      .getNativeAttributeAsString('title');
  }

  public get main(): MainPartial | undefined {
    return this.findPartial(MainPartial, MainPartial.tag);
  }

  public get description(): DescriptionPartial | undefined {
    return this.findPartial(DescriptionPartial, DescriptionPartial.tag);
  }

  public get usages(): UsagePartial[] {
    return this.findPartials(UsagePartial, UsagePartial.tag);
  }

  public get partials(): PartialType[] {
    const partials = [];
    this.main && partials.push(this.main);
    this.description && partials.push(this.description);
    return [...partials, ...this.usages];
  }

  public apply(replacement: PartialType): Variable[] {
    const { variables, code } = replacement.generate();
    const prefix = this.source.substr(0, replacement.start);
    const suffix = this.source.substr(replacement.end);
    this.source = `${prefix}${code}${suffix}`;
    return variables;
  }

  public define(variables: Variable[]) {
    const variablesClone = [...variables];

    // sort variables by placeholders goes first
    variablesClone.sort((left, right) => {
      if (left.asPlaceholder && right.asPlaceholder) {
        return 0;
      } else if (left.asPlaceholder) {
        return -1;
      } else if (right.asPlaceholder) {
        return 1;
      }

      return 0;
    });

    // merge variables with the same names
    const variablesHash = variablesClone.reduce((stack: { [key: string]: Variable }, variable) => {
      if (stack[variable.name]) { // if variable with the same name already exists
        if (!stack[variable.name].asPlaceholder) {
          throw new Error(`Variable with name '${variable.name} already exists in the hash`);
        }
      }

      stack[variable.name] = variable;
      return stack;
    }, {});

    // create variables definitions string
    const definitions = Object.values(variablesHash)
      .map((variable) => `const ${variable.name} = ${JSON.stringify(variable.value)};`);

    // append definitions to the first script
    this.source = this.source
      .replace(/(<script[^>]*>)/, `$1\n  ${definitions.join('\n  ')}`);
  }

  private findPartials(partial: PartialClassType, tag: string): PartialType[] {
    const aliases = this.resolveTagAliases(tag);
    const nodes = Documentation.findInlineComponentByTagAliases(this.tree.html, aliases);
    return nodes.map((node) => new partial({ path: this.path, node }));
  }

  private findPartial(partial: PartialClassType, tag: string): PartialType | undefined {
    const partials = this.findPartials(partial, tag);

    if (partials.length > 1) {
      throw new Error(`There should be only one declaration component usage inside the documentation file (${this.path})`);
    } else if (!partials.length) {
      return undefined;
    }

    return partials[0];
  }

  private resolveTagAliases(tag: string): string[] {
    const moduleTags = this.resolveTagAliasesFromScript(this.module, tag);
    const instanceTags = this.resolveTagAliasesFromScript(this.instance, tag);
    return [...moduleTags, ...instanceTags];
  }

  private resolveTagAliasesFromScript(script: Script, tag: string): string[] {
    if (!script) {
      return [];
    }

    const path = tag.split('.');
    const selfImportDeclarations = script.imports
      .filter((node) => node.source.value === this.package.name);

    let aliases: string[] = [];
    for (const selfImportDeclaration of selfImportDeclarations) {
      for (const specifier of selfImportDeclaration.specifiers) {
        const model = IMPORT_SPECIFIER_TO_MODEL[specifier.type];
        const instance = new model({ script, specifier: specifier as any });
        aliases = [...aliases, ...instance.resolveTags(path)];
      }
    }

    return aliases;
  }


  private static findInlineComponentByTagAliases(node: TemplateNode, aliases: string[]): InlineComponent[] {
    if (!aliases.length) {
      return [];
    }

    if (node.type === 'InlineComponent' && aliases.includes(node.name)) {
      return [node as InlineComponent];
    }

    if (node.children) {
      let nodes: InlineComponent[] = [];
      for (const child of node.children) {
        nodes = [...nodes, ...Documentation.findInlineComponentByTagAliases(child, aliases)];
      }

      return nodes;
    }

    return [];
  }
}
