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
const path = __importStar(require("path"));
const colors_1 = __importDefault(require("colors"));
const displayCommandGreetings_1 = __importDefault(require("./../helpers/displayCommandGreetings"));
const displayCommandDone_1 = __importDefault(require("../helpers/displayCommandDone"));
const displayCommandStep_1 = __importDefault(require("../helpers/displayCommandStep"));
const constants_1 = require("../constants");
function setup(program) {
    program
        .command('setup')
        .description('Setup target project with the template')
        .requiredOption('--project <path>', 'Path to the target project (where you store package.json for your project)')
        .action((cmd) => {
        displayCommandGreetings_1.default(cmd);
        const sourcePath = path.resolve(constants_1.PATH_TEMPLATE);
        const targetPath = path.resolve(cmd.project);
        displayCommandStep_1.default(cmd, colors_1.default.blue.bold('Setup your project with the documentation site template'));
        displayCommandStep_1.default(cmd, `${colors_1.default.bold('Path to the template')}: ${colors_1.default.italic(sourcePath)}`);
        displayCommandStep_1.default(cmd, `${colors_1.default.bold('Path to the project')}: ${colors_1.default.italic(targetPath)}`);
        let conflictsCounter = 0;
        function filter(src, dest) {
            const srcStat = fs.statSync(src);
            if (srcStat.isFile()) {
                displayCommandStep_1.default(cmd, `  ${colors_1.default.blue('Copy template file...')}`);
                displayCommandStep_1.default(cmd, `    From '${colors_1.default.italic(src)}'`);
                displayCommandStep_1.default(cmd, `    To '${colors_1.default.italic(dest)}'`);
                if (fs.existsSync(dest)) {
                    conflictsCounter++;
                    displayCommandStep_1.default(cmd, `    ${colors_1.default.yellow('File already exists: skipped;')}`);
                    return false;
                }
            }
            return true;
        }
        displayCommandStep_1.default(cmd, 'Copy every file from the template...');
        fs.copySync(sourcePath, targetPath, { recursive: true, overwrite: true, filter });
        if (conflictsCounter) {
            displayCommandStep_1.default(cmd, colors_1.default.yellow(`${colors_1.default.bold(conflictsCounter.toString())} conflicts were found: take a look at yellow text above`));
        }
        displayCommandDone_1.default(cmd);
    });
}
exports.default = setup;
;
