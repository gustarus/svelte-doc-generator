"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i = 0;
const partial = '${id}';
function generateUniqueIdentifier(template = `uniq${partial}`) {
    if (!template.includes(partial)) {
        throw new Error(`Invalid variable template '${template}': should has '${partial}' part`);
    }
    const name = template.replace(partial, i.toString());
    i++;
    return name;
}
exports.default = generateUniqueIdentifier;
