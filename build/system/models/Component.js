"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SvelteSource_1 = __importDefault(require("../base/SvelteSource"));
class Component extends SvelteSource_1.default {
    get definition() {
        return {
            module: this.module
                ? this.module.definition : undefined,
            instance: this.instance
                ? this.instance.definition : undefined
        };
    }
}
exports.default = Component;
