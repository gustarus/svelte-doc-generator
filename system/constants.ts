import * as path from 'path';
import resolvePackagePath from './helpers/resolvePackagePath';
import Import from "./imports/Import";
import DefaultImport from "./imports/DefaultImport";
import NamespaceImport from "./imports/NamespaceImport";
import generateUniqueIdentifier from './helpers/generateUniqueIdentifier';

export const PATH_ROOT = resolvePackagePath(__dirname);
export const PATH_TEMPLATE = path.resolve(PATH_ROOT, 'template');

export const DOCUMENTATION_PATH_SUFFIX = 'Documentation';
export const DOCUMENTATION_PATH_EXTENSION = 'svelte';
export const DOCUMENTATION_VARIABLE_RAW = generateUniqueIdentifier();
export const DOCUMENTATION_VARIABLE_DEFINITION = generateUniqueIdentifier();
export const DOCUMENTATION_VARIABLE_INITIALIZATION = generateUniqueIdentifier();

export const WATCH_DELAY = 1000;
export const WATCH_TEMPLATES = ['/**/*'];

export const IMPORT_SPECIFIER_TO_MODEL = {
  ImportSpecifier: Import,
  ImportDefaultSpecifier: DefaultImport,
  ImportNamespaceSpecifier: NamespaceImport
};
