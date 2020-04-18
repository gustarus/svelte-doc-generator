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
const fs = __importStar(require("fs-extra"));
const Source_1 = __importDefault(require("../base/Source"));
class Router extends Source_1.default {
    generate() {
        const imports = this.routes.map(({ name }) => `import ${name} from './${name}';`);
        const items = this.routes.map(({ name, title }) => {
            return `{ name: ${JSON.stringify(name)}, title: ${JSON.stringify(title)}, component: ${name} }`;
        });
        const content = `${imports.join('\n')}\n\nexport default [\n  ${items.join(',\n  ')}\n];`;
        fs.writeFileSync(this.path, content);
    }
}
exports.default = Router;
