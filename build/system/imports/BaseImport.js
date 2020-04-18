"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
class BaseImport extends Base_1.default {
    resolveTagReplacements(name, inner) {
        const path = [name, ...inner];
        let tags = [path.join('.')];
        const declarations = this.script.data.content.body
            .filter((node) => node.type === 'VariableDeclaration');
        for (const declaration of declarations) {
            for (const declarator of declaration.declarations) {
                if (declarator.init) {
                    if (declarator.init.type === 'Identifier') {
                        if (declarator.init.name === name) {
                            if (declarator.id.type === 'ObjectPattern') {
                                for (const property of declarator.id.properties) {
                                    tags = [...tags, ...this.resolveTagReplacementsFromProperty(property, inner)];
                                }
                            }
                        }
                    }
                    else if (declarator.init.type === 'MemberExpression') {
                        const nestedPath = this.resolveTagNestedPath(declarator.init);
                        let valid = true;
                        for (let i = 0; i < nestedPath.length; i++) {
                            if (nestedPath[i] !== path[i]) {
                                valid = false;
                                break;
                            }
                        }
                        if (valid) {
                            const declarationPath = path.slice(nestedPath.length - 1);
                            tags.push(declarationPath.join('.'));
                        }
                    }
                    else {
                        // TODO
                    }
                }
            }
        }
        return tags;
    }
    resolveTagReplacementsFromProperty(property, path) {
        const base = path[0];
        const key = property.key;
        if (key.name === base) {
            if (property.value.type === 'ObjectPattern') {
                let tags = [];
                for (const child of property.value.properties) {
                    tags = [...tags, ...this.resolveTagReplacementsFromProperty(child, path.slice(1))];
                }
                return tags;
            }
            else if (property.value.type === 'Identifier') {
                return [path.join('.')];
            }
            else {
                throw new Error('todo');
            }
        }
        return [];
    }
    resolveTagNestedPath(memberExpression, suffix = []) {
        if (!memberExpression.object) {
            throw Error('todo');
        }
        const propertyIdentifier = memberExpression.property;
        const combinedSuffix = [propertyIdentifier.name, ...suffix];
        if (memberExpression.object.type === 'MemberExpression') { // nested expressions
            const object = memberExpression.object;
            return this.resolveTagNestedPath(object, combinedSuffix);
        }
        else if (memberExpression.object.type === 'Identifier') {
            const id = memberExpression.object;
            return [id.name, ...combinedSuffix];
        }
        else {
            throw Error('todo');
        }
    }
}
exports.default = BaseImport;
