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
const resolveDocumentationComponentPath_1 = __importDefault(require("../helpers/resolveDocumentationComponentPath"));
const resolveDocumentationDirectoryPath_1 = __importDefault(require("../helpers/resolveDocumentationDirectoryPath"));
const resolveDocumentationDirectoryComponentPath_1 = __importDefault(require("../helpers/resolveDocumentationDirectoryComponentPath"));
const Package_1 = __importDefault(require("../models/Package"));
const Component_1 = __importDefault(require("../models/Component"));
const Documentation_1 = __importDefault(require("../models/Documentation"));
const Generator_1 = __importDefault(require("../models/Generator"));
const Dictionary_1 = __importDefault(require("../models/Dictionary"));
const resolveMenuFromGenerators_1 = __importDefault(require("../helpers/resolveMenuFromGenerators"));
const constants_1 = require("../constants");
const displayCommandGreetings_1 = __importDefault(require("../helpers/displayCommandGreetings"));
const displayCommandStep_1 = __importDefault(require("../helpers/displayCommandStep"));
const displayCommandDone_1 = __importDefault(require("../helpers/displayCommandDone"));
const createEmptyDirectory_1 = __importDefault(require("../helpers/createEmptyDirectory"));
function generate(program) {
    program
        .command('generate')
        .description('Generate documentation library from components')
        .requiredOption('--library <path>', 'Path to the source library (where you store your components)')
        .requiredOption('--target <path>', 'Path to the target library (where to store generated library documentations)')
        .action((cmd) => {
        displayCommandGreetings_1.default(cmd);
        const pathToPackage = path.resolve(constants_1.PATH_ROOT, 'package.json');
        const pathToLibrary = path.resolve(cmd.library);
        const pathToTarget = path.resolve(cmd.target);
        displayCommandStep_1.default(cmd, colors_1.default.blue.bold('Generate documentation for whole library'));
        displayCommandStep_1.default(cmd, `${colors_1.default.bold('Path to the library')}: ${colors_1.default.italic(pathToLibrary)}`);
        displayCommandStep_1.default(cmd, `${colors_1.default.bold('Path to the target library documentation')}: ${colors_1.default.italic(pathToTarget)}`);
        // create package instance
        const that = new Package_1.default({ path: pathToPackage });
        // create empty directory for the library
        createEmptyDirectory_1.default(pathToTarget);
        // loop for the whole directory
        const directory = fs.readdirSync(pathToLibrary);
        const generated = [];
        for (const name of directory) {
            const pathToComponent = path.resolve(pathToLibrary, name, `${name}.svelte`);
            const pathToDocumentationTargetDirectory = path.resolve(pathToTarget, name);
            displayCommandStep_1.default(cmd, colors_1.default.blue(` Generate documentation for ${colors_1.default.bold(name)}...`));
            // check if component exists
            if (!fs.existsSync(pathToComponent)) {
                displayCommandStep_1.default(cmd, colors_1.default.yellow(`  Unable to find component file: expected '${colors_1.default.italic(pathToComponent)}'; skipped`));
                continue;
            }
            // check if documentation component exists
            let pathToDocumentationSource;
            const pathToDocumentationComponent = resolveDocumentationComponentPath_1.default(pathToComponent);
            const pathToDocumentationDirectory = resolveDocumentationDirectoryPath_1.default(pathToComponent);
            const pathToDocumentationDirectoryComponent = resolveDocumentationDirectoryComponentPath_1.default(pathToComponent);
            if (fs.existsSync(pathToDocumentationComponent)) { // if documentation component exists
                createEmptyDirectory_1.default(pathToDocumentationTargetDirectory);
                pathToDocumentationSource = pathToDocumentationComponent;
            }
            else if (fs.existsSync(pathToDocumentationDirectory)) { // if documentation directory exists
                if (fs.existsSync(pathToDocumentationDirectoryComponent)) { // if documentation component exists inside directory
                    createEmptyDirectory_1.default(pathToDocumentationTargetDirectory);
                    // copy all content from the documentation path to the target path
                    fs.copySync(pathToDocumentationDirectory, pathToDocumentationTargetDirectory, {
                        overwrite: true,
                        recursive: true,
                        filter: (src, dest) => src !== pathToDocumentationDirectoryComponent
                    });
                    pathToDocumentationSource = pathToDocumentationDirectoryComponent;
                }
                else {
                    displayCommandStep_1.default(cmd, colors_1.default.yellow(`  Unable to find component documentation file: expected ${colors_1.default.italic(pathToDocumentationDirectoryComponent)}: skipped`));
                    continue;
                }
            }
            else {
                displayCommandStep_1.default(cmd, colors_1.default.yellow(`  Unable to find component documentation file: expected ${colors_1.default.italic(pathToDocumentationComponent)}: skipped`));
                continue;
            }
            // generate component documentation
            const component = new Component_1.default({ path: pathToComponent });
            const documentation = new Documentation_1.default({ path: pathToDocumentationSource, package: that, component });
            const generator = new Generator_1.default({ name, directory: pathToDocumentationTargetDirectory, package: that, documentation });
            generator.generate();
            generated.push(generator);
            displayCommandStep_1.default(cmd, colors_1.default.green('  Successfully generated'));
        }
        // generate library index
        const pathToTargetIndex = path.resolve(pathToTarget, 'index.js');
        displayCommandStep_1.default(cmd, `Generate index inside ${colors_1.default.italic(pathToTargetIndex)}...`);
        const items = resolveMenuFromGenerators_1.default(generated);
        const dictionary = new Dictionary_1.default({ path: pathToTargetIndex, items });
        dictionary.generate();
        displayCommandStep_1.default(cmd, colors_1.default.green(`Successfully generated for ${generated.length} components inside ${colors_1.default.italic(pathToTarget)}`));
        displayCommandDone_1.default(cmd);
    });
}
exports.default = generate;
;
