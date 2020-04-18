"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
const generateUniqueIdentifier_1 = __importDefault(require("../helpers/generateUniqueIdentifier"));
class Variable extends Base_1.default {
    constructor() {
        super(...arguments);
        this.defaults = {
            value: false,
            asPlaceholder: false
        };
    }
    get name() {
        if (!this._name) {
            this._name = generateUniqueIdentifier_1.default('var${id}');
        }
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
}
exports.default = Variable;
