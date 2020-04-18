"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseImport_1 = __importDefault(require("./BaseImport"));
class Import extends BaseImport_1.default {
    resolveTags(namePath) {
        const base = namePath[0];
        if (this.specifier.imported.name === base) {
            return this.resolveTagReplacements(this.specifier.local.name, namePath.slice(1));
        }
        return [];
    }
}
exports.default = Import;
