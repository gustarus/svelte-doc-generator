"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasePartial_1 = __importDefault(require("./BasePartial"));
class UsagePartial extends BasePartial_1.default {
    static get tag() {
        return 'Component.Usage';
    }
}
exports.default = UsagePartial;
