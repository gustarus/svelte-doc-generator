"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resolveMenuFromGenerators(generators) {
    return generators.map((generator) => {
        return {
            name: generator.name,
            title: generator.documentation.title,
        };
    });
}
exports.default = resolveMenuFromGenerators;
