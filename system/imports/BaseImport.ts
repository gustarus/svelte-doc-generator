import Base  from '../base/Base';
import {
  BaseModuleSpecifier, Identifier,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier, Property,
  VariableDeclaration,
  Node, MemberExpression
} from 'estree';
import Source from '../base/Source';
import Import from "./Import";
import DefaultImport from "./DefaultImport";
import NamespaceImport from "./NamespaceImport";
import Script from "../models/Script";

export namespace BaseImportSpace {
  export type Config = {
    script: Script;
    specifier: BaseModuleSpecifier;
  };
}

export default abstract class BaseImport<C> extends Base<BaseImportSpace.Config & C>{

  public script: Script;

  public specifier: BaseModuleSpecifier;

  public abstract resolveTags(namePath: string[]): string[];

  public resolveTagReplacements(name: string, inner: string[]): string[] {
    const path = [name, ...inner];
    let tags = [path.join('.')];

    const declarations = this.script.data.content.body
      .filter((node) => node.type === 'VariableDeclaration') as VariableDeclaration[];

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
          } else if (declarator.init.type === 'MemberExpression') {
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
          } else {
            // TODO
          }
        }
      }
    }

    return tags;
  }

  public resolveTagReplacementsFromProperty(property: Property, path: string[]): string[] {
    const base = path[0];
    const key = property.key as Identifier;
    if (key.name === base) {
      if (property.value.type === 'ObjectPattern') {
        let tags: string[] = [];
        for (const child of property.value.properties) {
          tags = [...tags, ...this.resolveTagReplacementsFromProperty(child, path.slice(1))];
        }

        return tags;
      } else if (property.value.type === 'Identifier') {
        return [path.join('.')];
      } else {
        throw new Error('todo');
      }
    }

    return [];
  }

  public resolveTagNestedPath(memberExpression: MemberExpression, suffix: string[] = []): string[] {
    if (!memberExpression.object) {
      throw Error('todo');
    }

    const propertyIdentifier = memberExpression.property as Identifier;
    const combinedSuffix = [propertyIdentifier.name, ...suffix];
    if (memberExpression.object.type === 'MemberExpression') { // nested expressions
      const object = memberExpression.object as MemberExpression;
      return this.resolveTagNestedPath(object, combinedSuffix);
    } else if (memberExpression.object.type === 'Identifier') {
      const id = memberExpression.object as Identifier;
      return [id.name, ...combinedSuffix];
    } else {
      throw Error('todo');
    }
  }
}
