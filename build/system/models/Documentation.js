"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SvelteSource_1 = __importDefault(require("../base/SvelteSource"));
const UsagePartial_1 = __importDefault(require("../partials/UsagePartial"));
const MainPartial_1 = __importDefault(require("../partials/MainPartial"));
const DescriptionPartial_1 = __importDefault(require("../partials/DescriptionPartial"));
const constants_1 = require("../constants");
class Documentation extends SvelteSource_1.default {
    get title() {
        if (!this.main) {
            return '';
        }
        return this.main
            .getNativeAttributeAsString('title');
    }
    get main() {
        return this.findPartial(MainPartial_1.default, MainPartial_1.default.tag);
    }
    get description() {
        return this.findPartial(DescriptionPartial_1.default, DescriptionPartial_1.default.tag);
    }
    get usages() {
        return this.findPartials(UsagePartial_1.default, UsagePartial_1.default.tag);
    }
    get partials() {
        const partials = [];
        this.main && partials.push(this.main);
        this.description && partials.push(this.description);
        return [...partials, ...this.usages];
    }
    apply(replacement) {
        const { variables, code } = replacement.generate();
        const prefix = this.source.substr(0, replacement.start);
        const suffix = this.source.substr(replacement.end);
        this.source = `${prefix}${code}${suffix}`;
        return variables;
    }
    define(variables) {
        const variablesClone = [...variables];
        // sort variables by placeholders goes first
        variablesClone.sort((left, right) => {
            if (left.asPlaceholder && right.asPlaceholder) {
                return 0;
            }
            else if (left.asPlaceholder) {
                return -1;
            }
            else if (right.asPlaceholder) {
                return 1;
            }
            return 0;
        });
        // merge variables with the same names
        const variablesHash = variablesClone.reduce((stack, variable) => {
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
    findPartials(partial, tag) {
        const aliases = this.resolveTagAliases(tag);
        const nodes = Documentation.findInlineComponentByTagAliases(this.tree.html, aliases);
        return nodes.map((node) => new partial({ path: this.path, node }));
    }
    findPartial(partial, tag) {
        const partials = this.findPartials(partial, tag);
        if (partials.length > 1) {
            throw new Error(`There should be only one declaration component usage inside the documentation file (${this.path})`);
        }
        else if (!partials.length) {
            return undefined;
        }
        return partials[0];
    }
    resolveTagAliases(tag) {
        const moduleTags = this.resolveTagAliasesFromScript(this.module, tag);
        const instanceTags = this.resolveTagAliasesFromScript(this.instance, tag);
        return [...moduleTags, ...instanceTags];
    }
    resolveTagAliasesFromScript(script, tag) {
        if (!script) {
            return [];
        }
        const path = tag.split('.');
        const selfImportDeclarations = script.imports
            .filter((node) => node.source.value === this.package.name);
        let aliases = [];
        for (const selfImportDeclaration of selfImportDeclarations) {
            for (const specifier of selfImportDeclaration.specifiers) {
                const model = constants_1.IMPORT_SPECIFIER_TO_MODEL[specifier.type];
                const instance = new model({ script, specifier: specifier });
                aliases = [...aliases, ...instance.resolveTags(path)];
            }
        }
        return aliases;
    }
    static findInlineComponentByTagAliases(node, aliases) {
        if (!aliases.length) {
            return [];
        }
        if (node.type === 'InlineComponent' && aliases.includes(node.name)) {
            return [node];
        }
        if (node.children) {
            let nodes = [];
            for (const child of node.children) {
                nodes = [...nodes, ...Documentation.findInlineComponentByTagAliases(child, aliases)];
            }
            return nodes;
        }
        return [];
    }
}
exports.default = Documentation;
