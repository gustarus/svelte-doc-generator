"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SvelteSource_1 = __importDefault(require("../base/SvelteSource"));
const Variable_1 = __importDefault(require("../models/Variable"));
const Attribute_1 = __importDefault(require("../models/Attribute"));
const encodeSpecialChars_1 = __importDefault(require("../helpers/encodeSpecialChars"));
const generateUniqueIdentifier_1 = __importDefault(require("../helpers/generateUniqueIdentifier"));
class BasePartial extends SvelteSource_1.default {
    get id() {
        if (!this._id) {
            this._id = generateUniqueIdentifier_1.default('${id}');
        }
        return this._id;
    }
    get start() {
        return this.node.start;
    }
    get end() {
        return this.node.end;
    }
    static get tag() {
        throw new ReferenceError('Not implemented');
    }
    ;
    get code() {
        if (!this.node.children.length) {
            return '';
        }
        const start = this.node.children[0].start;
        const end = this.node.children[this.node.children.length - 1].end;
        return this.source.substr(start, end - start);
    }
    get content() {
        return this.code;
    }
    get slot() {
        return undefined;
    }
    generate(variables = [], attributes = []) {
        const source = encodeSpecialChars_1.default(this.code);
        const sourceVariable = new Variable_1.default({ value: source });
        const sourceAttribute = new Attribute_1.default({ name: 'source', value: sourceVariable });
        const tag = this.generateTag([...attributes, sourceAttribute]);
        return {
            variables: [...variables, sourceVariable],
            code: this.slot ? this.generateSlot(tag) : tag
        };
    }
    generateSlot(content) {
        return `<div slot="${this.slot}">${content}</div>`;
    }
    generateTag(customAttributes = []) {
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
    extractNativeAttribute(name) {
        const attribute = this.getNativeAttribute(name);
        if (!attribute) {
            return undefined;
        }
        return this.source
            .substr(attribute.start, attribute.end - attribute.start);
    }
    getNativeAttribute(name) {
        return this.node.attributes
            .find((attribute) => attribute.name === name);
    }
    getNativeAttributeAsString(name) {
        const attribute = this.getNativeAttribute(name);
        return attribute && attribute.value && attribute.value.length
            ? attribute.value[0].data : '';
    }
}
exports.default = BasePartial;
