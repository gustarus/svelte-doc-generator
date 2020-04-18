"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = __importDefault(require("colors/safe"));
function displayCommandGreetings(cmd) {
    console.log(`[${safe_1.default.blue(cmd.name())}] ${cmd.description()}`);
}
exports.default = displayCommandGreetings;
;
