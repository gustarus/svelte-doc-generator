import Import from "./imports/Import";
import DefaultImport from "./imports/DefaultImport";
import NamespaceImport from "./imports/NamespaceImport";
export declare const PATH_ROOT: string;
export declare const PATH_TEMPLATE: string;
export declare const DOCUMENTATION_PATH_SUFFIX = "Documentation";
export declare const DOCUMENTATION_PATH_EXTENSION = "svelte";
export declare const DOCUMENTATION_VARIABLE_RAW: string;
export declare const DOCUMENTATION_VARIABLE_DEFINITION: string;
export declare const DOCUMENTATION_VARIABLE_INITIALIZATION: string;
export declare const WATCH_DELAY = 1000;
export declare const WATCH_TEMPLATES: string[];
export declare const IMPORT_SPECIFIER_TO_MODEL: {
    ImportSpecifier: typeof Import;
    ImportDefaultSpecifier: typeof DefaultImport;
    ImportNamespaceSpecifier: typeof NamespaceImport;
};
