"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasePartial_1 = __importDefault(require("./BasePartial"));
const Variable_1 = __importDefault(require("../models/Variable"));
const Attribute_1 = __importDefault(require("../models/Attribute"));
const constants_1 = require("../constants");
class MainPartial extends BasePartial_1.default {
    static get tag() {
        return 'Component';
    }
    generate(variables = [], attributes = [], withContent = true) {
        // use global name to pass source code attribute to the component
        const rawVariable = new Variable_1.default({
            name: constants_1.DOCUMENTATION_VARIABLE_RAW,
            value: undefined,
            asPlaceholder: true
        });
        // use global name to pass definitions attribute to the component
        const definitionVariable = new Variable_1.default({
            name: constants_1.DOCUMENTATION_VARIABLE_DEFINITION,
            value: undefined,
            asPlaceholder: true
        });
        // use global name to pass initialization attribute to the component
        const initializationVariable = new Variable_1.default({
            name: constants_1.DOCUMENTATION_VARIABLE_INITIALIZATION,
            value: undefined,
            asPlaceholder: true
        });
        const rawAttribute = new Attribute_1.default({ name: 'raw', value: rawVariable });
        const definitionAttribute = new Attribute_1.default({ name: 'definition', value: definitionVariable });
        const initializationAttribute = new Attribute_1.default({ name: 'initialization', value: initializationVariable });
        return super.generate([...variables, rawVariable, initializationVariable, definitionVariable], [...attributes, rawAttribute, initializationAttribute, definitionAttribute]);
    }
}
exports.default = MainPartial;
