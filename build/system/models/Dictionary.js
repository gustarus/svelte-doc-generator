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
class Dictionary extends Source_1.default {
    generate() {
        const names = this.items.map(({ name }) => name);
        const imports = this.items.map(({ name }) => `import ${name} from './${name}';`);
        const items = this.items.map(({ name, title }) => {
            const slashed = (title || name).replace(/'/g, '\\\'');
            return `{ name: '${name}', title: '${slashed}', component: ${name} }`;
        });
        const exportDefault = `export default [\n  ${items.join(',\n  ')}\n];`;
        const exportCollection = `export { ${names.join(', ')} };`;
        const content = `${imports.join('\n')}\n\n${exportDefault}\n\n${exportCollection}`;
        fs.writeFileSync(this.path, content);
    }
}
exports.default = Dictionary;
