"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
const Variable_1 = __importDefault(require("./Variable"));
class Attribute extends Base_1.default {
    get raw() {
        return `${this.name}=${this.compiled}`;
    }
    get compiled() {
        if (this.value instanceof Variable_1.default) {
            return `{${this.value.name}}`;
        }
        const formatted = this.value
            .replace(/\n/g, '\\n')
            .replace(/"/g, '\\"');
        return `"${formatted}"`;
    }
}
exports.default = Attribute;
