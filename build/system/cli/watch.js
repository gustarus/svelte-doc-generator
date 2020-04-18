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
const glob_watcher_1 = __importDefault(require("glob-watcher"));
const Package_1 = __importDefault(require("../models/Package"));
const constants_1 = require("../constants");
const displayCommandGreetings_1 = __importDefault(require("../helpers/displayCommandGreetings"));
const displayCommandStep_1 = __importDefault(require("../helpers/displayCommandStep"));
const child_process_1 = require("child_process");
function trigger(cmd, pathToCli, pathToLibrary, pathToTarget, show = false) {
    try {
        const command = `node ${pathToCli} generate --library ${pathToLibrary} --target ${pathToTarget}`;
        const result = child_process_1.execSync(command).toString().trim();
        show && console.log(result);
        displayCommandStep_1.default(cmd, colors_1.default.green('The library successfully updated'));
    }
    catch (error) {
        displayCommandStep_1.default(cmd, colors_1.default.red(error.message));
        displayCommandStep_1.default(cmd, colors_1.default.yellow('Something bad happened inside the generation tool'));
    }
    displayCommandStep_1.default(cmd, colors_1.default.blue('Waiting for changes...'));
}
function watch(program) {
    program
        .command('watch')
        .description('Watch for documentation changes and generate new documentation library on every change')
        .requiredOption('--library <path>', 'Path to the source library (where you store your components)')
        .requiredOption('--target <path>', 'Path to the target library (where to store generated library documentations)')
        .action((cmd) => {
        displayCommandGreetings_1.default(cmd);
        const pathToPackage = path.resolve(constants_1.PATH_ROOT, 'package.json');
        const pathToLibrary = path.resolve(cmd.library);
        const pathToTarget = path.resolve(cmd.target);
        displayCommandStep_1.default(cmd, colors_1.default.blue.bold('Watch for documentation for whole library'));
        displayCommandStep_1.default(cmd, `${colors_1.default.bold('Path to watch changes in')}: ${colors_1.default.italic(pathToLibrary)}`);
        displayCommandStep_1.default(cmd, `${colors_1.default.bold('Path to the target library documentation')}: ${colors_1.default.italic(pathToTarget)}`);
        // create package instance
        const that = new Package_1.default({ path: pathToPackage });
        // resolve path to the cli tool
        const pathToCli = path.resolve(constants_1.PATH_ROOT, that.cli);
        if (!fs.existsSync(pathToCli)) {
            displayCommandStep_1.default(cmd, colors_1.default.red('Unable to resolve path to the cli tool: looks like tool problem'));
            process.exit(0);
        }
        // run first time generation
        displayCommandStep_1.default(cmd, colors_1.default.blue('Generate for the first time...'));
        trigger(cmd, pathToCli, pathToLibrary, pathToTarget, true);
        // watching for changes
        const templatesToWatch = constants_1.WATCH_TEMPLATES.map((template) => `${pathToLibrary}${template}`);
        glob_watcher_1.default(templatesToWatch, { delay: constants_1.WATCH_DELAY }, (done) => {
            trigger(cmd, pathToCli, pathToLibrary, pathToTarget);
            done();
        });
    });
}
exports.default = watch;
;
