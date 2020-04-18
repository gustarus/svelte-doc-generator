"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const resolvePackagePath_1 = __importDefault(require("./helpers/resolvePackagePath"));
const Import_1 = __importDefault(require("./imports/Import"));
const DefaultImport_1 = __importDefault(require("./imports/DefaultImport"));
const NamespaceImport_1 = __importDefault(require("./imports/NamespaceImport"));
const generateUniqueIdentifier_1 = __importDefault(require("./helpers/generateUniqueIdentifier"));
exports.PATH_ROOT = resolvePackagePath_1.default(__dirname);
exports.PATH_TEMPLATE = path.resolve(exports.PATH_ROOT, 'template');
exports.DOCUMENTATION_PATH_SUFFIX = 'Documentation';
exports.DOCUMENTATION_PATH_EXTENSION = 'svelte';
exports.DOCUMENTATION_VARIABLE_RAW = generateUniqueIdentifier_1.default();
exports.DOCUMENTATION_VARIABLE_DEFINITION = generateUniqueIdentifier_1.default();
exports.DOCUMENTATION_VARIABLE_INITIALIZATION = generateUniqueIdentifier_1.default();
exports.WATCH_DELAY = 1000;
exports.WATCH_TEMPLATES = ['/**/*'];
exports.IMPORT_SPECIFIER_TO_MODEL = {
    ImportSpecifier: Import_1.default,
    ImportDefaultSpecifier: DefaultImport_1.default,
    ImportNamespaceSpecifier: NamespaceImport_1.default
};
