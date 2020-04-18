"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encodeSvelteValue(source) {
    return source
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;');
}
exports.default = encodeSvelteValue;
