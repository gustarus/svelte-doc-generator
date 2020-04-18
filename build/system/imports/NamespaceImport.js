"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseImport_1 = __importDefault(require("./BaseImport"));
class NamespaceImport extends BaseImport_1.default {
    resolveTags(namePath) {
        return this.resolveTagReplacements(this.specifier.local.name, namePath);
    }
}
exports.default = NamespaceImport;
