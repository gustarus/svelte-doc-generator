import { Script as SvelteScript, TemplateNode, Var } from 'svelte/types/compiler/interfaces';
import SvelteSource from '../base/SvelteSource';
import InlineComponent from 'svelte/types/compiler/compile/nodes/InlineComponent';
import AttributeNode from 'svelte/types/compiler/compile/nodes/Attribute';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';
import encodeSpecialChars from '../helpers/encodeSpecialChars';
import generateUniqueIdentifier from '../helpers/generateUniqueIdentifier';

export namespace BasePartialSpace {
  export type Config = {
    node: InlineComponent;
  }

  export type Generated = {
    variables: Variable[];
    code: string,
  }
}

export default abstract class BasePartial<C> extends SvelteSource<BasePartialSpace.Config & C> {

  public static alias: string;

  private _id: string;

  public node: InlineComponent;

  public get id(): string {
    if (!this._id) {
      this._id = generateUniqueIdentifier('${id}');
    }

    return this._id;
  }

  public get start() {
    return this.node.start;
  }

  public get end() {
    return this.node.end;
  }

  public static get tag(): string {
    throw new ReferenceError('Not implemented');
  };

  public get code(): string {
    if (!this.node.children.length) {
      return '';
    }

    const start = this.node.children[0].start;
    const end = this.node.children[this.node.children.length - 1].end;
    return this.source.substr(start, end - start);
  }

  public get content(): string {
    return this.code;
  }

  public get slot(): string | undefined {
    return undefined;
  }

  public generate(variables: Variable[] = [], attributes: Attribute[] = []): BasePartialSpace.Generated {
    const source = encodeSpecialChars(this.code);
    const sourceVariable = new Variable({ value: source });
    const sourceAttribute = new Attribute({ name: 'source', value: sourceVariable });
    const tag = this.generateTag([...attributes, sourceAttribute]);

    return {
      variables: [...variables, sourceVariable],
      code: this.slot ? this.generateSlot(tag) : tag
    };
  }

  public generateSlot(content: string): string {
    return `<div slot="${this.slot}">${content}</div>`;
  }

  public generateTag(customAttributes: Attribute[] = []): string {
    const sourceAttributesCompiled = this.node.attributes
      .map((attribute) => this.extractNativeAttribute(attribute.name));
    const customAttributesCompiled = customAttributes
      .map((attribute) => attribute.raw);

    const attributesString = [
      ...sourceAttributesCompiled,
      ...customAttributesCompiled
    ].join(' ');

    return this.content
      ? `<${this.node.name} ${attributesString}>${this.content}</${this.node.name}>`
      : `<${this.node.name} ${attributesString} />`;
  }

  public extractNativeAttribute(name: string) {
    const attribute = this.getNativeAttribute(name);
    if (!attribute) {
      return undefined;
    }

    return this.source
      .substr(attribute.start, attribute.end - attribute.start);
  }

  public getNativeAttribute(name: string): AttributeNode | undefined {
    return this.node.attributes
      .find((attribute) => attribute.name === name);
  }

  public getNativeAttributeAsString(name: string): string {
    const attribute = this.getNativeAttribute(name) as any;
    return attribute && attribute.value && attribute.value.length
      ? attribute.value[0].data : '';
  }
}
