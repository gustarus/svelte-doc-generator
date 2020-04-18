"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseExport_1 = __importDefault(require("./BaseExport"));
class ClassExport extends BaseExport_1.default {
    get declaration() {
        throw new ReferenceError('Not implemented');
    }
    get name() {
        throw new ReferenceError('Not implemented');
    }
    get result() {
        throw new ReferenceError('Not implemented');
    }
}
exports.default = ClassExport;
