import * as fs from 'fs-extra';
import * as path from 'path';
import colors from 'colors';
import { Command } from 'commander';
import displayCommandGreetings from './../helpers/displayCommandGreetings';
import displayCommandDone from '../helpers/displayCommandDone';
import displayCommandStep from '../helpers/displayCommandStep';
import { PATH_TEMPLATE } from '../constants';

export default function setup(program: Command) {
  program
    .command('setup')
    .description('Setup target project with the template')
    .requiredOption('--project <path>', 'Path to the target project (where you store package.json for your project)')
    .action((cmd) => {
      displayCommandGreetings(cmd);

      const sourcePath = path.resolve(PATH_TEMPLATE);
      const targetPath = path.resolve(cmd.project);

      displayCommandStep(cmd, colors.blue.bold('Setup your project with the documentation site template'));
      displayCommandStep(cmd, `${colors.bold('Path to the template')}: ${colors.italic(sourcePath)}`);
      displayCommandStep(cmd, `${colors.bold('Path to the project')}: ${colors.italic(targetPath)}`);

      let conflictsCounter = 0;

      function filter(src: string, dest: string): boolean {
        const srcStat = fs.statSync(src);
        if (srcStat.isFile()) {
          displayCommandStep(cmd, `  ${colors.blue('Copy template file...')}`);
          displayCommandStep(cmd, `    From '${colors.italic(src)}'`);
          displayCommandStep(cmd, `    To '${colors.italic(dest)}'`);
          if (fs.existsSync(dest)) {
            conflictsCounter++;
            displayCommandStep(cmd, `    ${colors.yellow('File already exists: skipped;')}`);
            return false;
          }
        }

        return true;
      }

      displayCommandStep(cmd, 'Copy every file from the template...');
      fs.copySync(sourcePath, targetPath, { recursive: true, overwrite: true, filter });

      if (conflictsCounter) {
        displayCommandStep(cmd, colors.yellow(`${colors.bold(conflictsCounter.toString())} conflicts were found: take a look at yellow text above`));
      }

      displayCommandDone(cmd);
    });
};
