"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const constants_1 = require("../constants");
function resolveDocumentationDirectoryComponentPath(componentPath) {
    const { dir, name } = path.parse(componentPath);
    return path.resolve(dir, `${name}${constants_1.DOCUMENTATION_PATH_SUFFIX}`, `${name}${constants_1.DOCUMENTATION_PATH_SUFFIX}.${constants_1.DOCUMENTATION_PATH_EXTENSION}`);
}
exports.default = resolveDocumentationDirectoryComponentPath;
