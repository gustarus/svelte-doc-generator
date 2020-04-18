import * as fs from 'fs-extra';
import * as path from 'path';
import colors from 'colors';
import resolveDocumentationComponentPath from '../helpers/resolveDocumentationComponentPath';
import resolveDocumentationDirectoryPath from '../helpers/resolveDocumentationDirectoryPath';
import resolveDocumentationDirectoryComponentPath from '../helpers/resolveDocumentationDirectoryComponentPath';
import Package from '../models/Package';
import Component from '../models/Component';
import Documentation from '../models/Documentation';
import Generator from '../models/Generator';
import Dictionary from '../models/Dictionary';
import resolveIndexFromGenerators from '../helpers/resolveMenuFromGenerators';
import { PATH_ROOT } from '../constants';
import { Command } from 'commander';
import displayCommandGreetings from '../helpers/displayCommandGreetings';
import displayCommandStep from '../helpers/displayCommandStep';
import displayCommandDone from '../helpers/displayCommandDone';
import createEmptyDirectory from '../helpers/createEmptyDirectory';

export default function generate(program: Command) {
  program
    .command('generate')
    .description('Generate documentation library from components')
    .requiredOption('--library <path>', 'Path to the source library (where you store your components)')
    .requiredOption('--target <path>', 'Path to the target library (where to store generated library documentations)')
    .action((cmd) => {
      displayCommandGreetings(cmd);

      const pathToPackage = path.resolve(PATH_ROOT, 'package.json');
      const pathToLibrary = path.resolve(cmd.library);
      const pathToTarget = path.resolve(cmd.target);


      displayCommandStep(cmd, colors.blue.bold('Generate documentation for whole library'));
      displayCommandStep(cmd, `${colors.bold('Path to the library')}: ${colors.italic(pathToLibrary)}`);
      displayCommandStep(cmd, `${colors.bold('Path to the target library documentation')}: ${colors.italic(pathToTarget)}`);


      // create package instance
      const that = new Package({ path: pathToPackage });

      // create empty directory for the library
      createEmptyDirectory(pathToTarget);

      // loop for the whole directory
      const directory = fs.readdirSync(pathToLibrary);
      const generated = [];
      for (const name of directory) {
        const pathToComponent = path.resolve(pathToLibrary, name, `${name}.svelte`);
        const pathToDocumentationTargetDirectory = path.resolve(pathToTarget, name);
        displayCommandStep(cmd, colors.blue(` Generate documentation for ${colors.bold(name)}...`));

        // check if component exists
        if (!fs.existsSync(pathToComponent)) {
          displayCommandStep(cmd, colors.yellow(`  Unable to find component file: expected '${colors.italic(pathToComponent)}'; skipped`));
          continue;
        }

        // check if documentation component exists
        let pathToDocumentationSource: string;
        const pathToDocumentationComponent = resolveDocumentationComponentPath(pathToComponent);
        const pathToDocumentationDirectory = resolveDocumentationDirectoryPath(pathToComponent);
        const pathToDocumentationDirectoryComponent = resolveDocumentationDirectoryComponentPath(pathToComponent);
        if (fs.existsSync(pathToDocumentationComponent)) { // if documentation component exists
          createEmptyDirectory(pathToDocumentationTargetDirectory);
          pathToDocumentationSource = pathToDocumentationComponent;
        } else if (fs.existsSync(pathToDocumentationDirectory)) { // if documentation directory exists
          if (fs.existsSync(pathToDocumentationDirectoryComponent)) { // if documentation component exists inside directory
            createEmptyDirectory(pathToDocumentationTargetDirectory);

            // copy all content from the documentation path to the target path
            fs.copySync(pathToDocumentationDirectory, pathToDocumentationTargetDirectory, {
              overwrite: true,
              recursive: true,
              filter: (src: string, dest: string): boolean => src !== pathToDocumentationDirectoryComponent
            });

            pathToDocumentationSource = pathToDocumentationDirectoryComponent;
          } else {
            displayCommandStep(cmd, colors.yellow(`  Unable to find component documentation file: expected ${colors.italic(pathToDocumentationDirectoryComponent)}: skipped`));
            continue;
          }
        } else {
          displayCommandStep(cmd, colors.yellow(`  Unable to find component documentation file: expected ${colors.italic(pathToDocumentationComponent)}: skipped`));
          continue;
        }

        // generate component documentation
        const component = new Component({ path: pathToComponent });
        const documentation = new Documentation({ path: pathToDocumentationSource, package: that, component });
        const generator = new Generator({ name, directory: pathToDocumentationTargetDirectory, package: that, documentation });
        generator.generate();
        generated.push(generator);

        displayCommandStep(cmd, colors.green('  Successfully generated'));
      }

      // generate library index
      const pathToTargetIndex = path.resolve(pathToTarget, 'index.js');
      displayCommandStep(cmd, `Generate index inside ${colors.italic(pathToTargetIndex)}...`);
      const items = resolveIndexFromGenerators(generated);
      const dictionary = new Dictionary({ path: pathToTargetIndex, items });
      dictionary.generate();

      displayCommandStep(cmd, colors.green(`Successfully generated for ${generated.length} components inside ${colors.italic(pathToTarget)}`));
      displayCommandDone(cmd);
    });
};
