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
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const Documentation_1 = __importDefault(require("./Documentation"));
const Base_1 = __importDefault(require("../base/Base"));
const resolveRelativeImports_1 = __importDefault(require("../helpers/resolveRelativeImports"));
const Variable_1 = __importDefault(require("./Variable"));
const constants_1 = require("../constants");
const encodeSpecialChars_1 = __importDefault(require("../helpers/encodeSpecialChars"));
class Generator extends Base_1.default {
    constructor() {
        super(...arguments);
        this.fileNameIndex = 'index.js';
        this.fileNameDocumentation = 'Documentation.svelte';
    }
    get pathToIndex() {
        return path.resolve(this.directory, this.fileNameIndex);
    }
    get pathToDocumentation() {
        return path.resolve(this.directory, this.fileNameDocumentation);
    }
    get variables() {
        const variables = [];
        // retrieve documentation variables
        const raw = encodeSpecialChars_1.default(this.documentation.component.source);
        const definition = this.documentation.component.definition;
        const initialization = this.documentation.instance.definition;
        // create variables
        variables.push(new Variable_1.default({ name: constants_1.DOCUMENTATION_VARIABLE_RAW, value: raw }));
        variables.push(new Variable_1.default({ name: constants_1.DOCUMENTATION_VARIABLE_DEFINITION, value: definition }));
        variables.push(new Variable_1.default({ name: constants_1.DOCUMENTATION_VARIABLE_INITIALIZATION, value: initialization }));
        return variables;
    }
    generate() {
        // reset target documentation file if exists
        fs.writeFileSync(this.pathToDocumentation, this.documentation.source);
        // create documentation clone from cloned file
        const path = this.pathToDocumentation;
        const that = this.documentation.package;
        const component = this.documentation.component;
        const clone = new Documentation_1.default({ path, package: that, component });
        // rebind all imports paths and update the file
        clone.source = resolveRelativeImports_1.default(clone.source, this.documentation.path, this.pathToDocumentation);
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
exports.default = Generator;
