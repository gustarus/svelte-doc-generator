import * as fs from 'fs-extra';
import * as path from 'path';
import colors from 'colors';
import watcher from 'glob-watcher';
import resolveDocumentationComponentPath from '../helpers/resolveDocumentationComponentPath';
import resolveDocumentationDirectoryPath from '../helpers/resolveDocumentationDirectoryPath';
import resolveDocumentationDirectoryComponentPath from '../helpers/resolveDocumentationDirectoryComponentPath';
import Package from '../models/Package';
import Component from '../models/Component';
import Documentation from '../models/Documentation';
import Generator from '../models/Generator';
import Dictionary from '../models/Dictionary';
import resolveIndexFromGenerators from '../helpers/resolveMenuFromGenerators';
import { PATH_ROOT, WATCH_DELAY, WATCH_TEMPLATES } from '../constants';
import { Command } from 'commander';
import displayCommandGreetings from '../helpers/displayCommandGreetings';
import displayCommandStep from '../helpers/displayCommandStep';
import displayCommandDone from '../helpers/displayCommandDone';
import createEmptyDirectory from '../helpers/createEmptyDirectory';
import { execSync } from "child_process";

function trigger(cmd: Command, pathToCli: string, pathToLibrary: string, pathToTarget: string, show: boolean = false) {
  try {
    const command = `node ${pathToCli} generate --library ${pathToLibrary} --target ${pathToTarget}`;
    const result = execSync(command).toString().trim();

    show && console.log(result);
    displayCommandStep(cmd, colors.green('The library successfully updated'));
  } catch (error) {
    displayCommandStep(cmd, colors.red(error.message));
    displayCommandStep(cmd, colors.yellow('Something bad happened inside the generation tool'));
  }

  displayCommandStep(cmd, colors.blue('Waiting for changes...'));
}

export default function watch(program: Command) {
  program
    .command('watch')
    .description('Watch for documentation changes and generate new documentation library on every change')
    .requiredOption('--library <path>', 'Path to the source library (where you store your components)')
    .requiredOption('--target <path>', 'Path to the target library (where to store generated library documentations)')
    .action((cmd) => {
      displayCommandGreetings(cmd);

      const pathToPackage = path.resolve(PATH_ROOT, 'package.json');
      const pathToLibrary = path.resolve(cmd.library);
      const pathToTarget = path.resolve(cmd.target);

      displayCommandStep(cmd, colors.blue.bold('Watch for documentation for whole library'));
      displayCommandStep(cmd, `${colors.bold('Path to watch changes in')}: ${colors.italic(pathToLibrary)}`);
      displayCommandStep(cmd, `${colors.bold('Path to the target library documentation')}: ${colors.italic(pathToTarget)}`);

      // create package instance
      const that = new Package({ path: pathToPackage });

      // resolve path to the cli tool
      const pathToCli = path.resolve(PATH_ROOT, that.cli);
      if (!fs.existsSync(pathToCli)) {
        displayCommandStep(cmd, colors.red('Unable to resolve path to the cli tool: looks like tool problem'));
        process.exit(0);
      }

      // run first time generation
      displayCommandStep(cmd, colors.blue('Generate for the first time...'));
      trigger(cmd, pathToCli, pathToLibrary, pathToTarget, true);

      // watching for changes
      const templatesToWatch = WATCH_TEMPLATES.map((template) => `${pathToLibrary}${template}`);
      watcher(templatesToWatch, { delay: WATCH_DELAY }, (done) => {
        trigger(cmd, pathToCli, pathToLibrary, pathToTarget);
        done();
      });
    });
};
