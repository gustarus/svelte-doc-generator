"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encodeSpecialChars(source) {
    return source
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;');
}
exports.default = encodeSpecialChars;
