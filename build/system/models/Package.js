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
const fs = __importStar(require("fs"));
const Source_1 = __importDefault(require("../base/Source"));
class Package extends Source_1.default {
    get data() {
        const content = fs.readFileSync(this.path).toString();
        return JSON.parse(content);
    }
    get name() {
        return this.data.name;
    }
    get version() {
        return this.data.version;
    }
    get cli() {
        return this.data.bin[this.name];
    }
}
exports.default = Package;
