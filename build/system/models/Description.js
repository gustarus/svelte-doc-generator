"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
const resolveMarkdownFromComment_1 = __importDefault(require("../helpers/resolveMarkdownFromComment"));
class Description extends Base_1.default {
    get markdown() {
        const strings = this.comments.map((comment) => comment.value);
        return strings.map(resolveMarkdownFromComment_1.default).join('  \n');
    }
}
exports.default = Description;
