#!/usr/bin/env node

import * as path from 'path';
import program from 'commander';
import generate from './cli/generate';
import watch from './cli/watch';
import setup from './cli/setup';
import { PATH_ROOT } from './constants';
import Package from './models/Package';

const pathToPackage = path.resolve(PATH_ROOT, 'package.json');
const that = new Package({ path: pathToPackage });

// display description
program
  .version(that.version)
  .description('Tool to generate svelte documentation');

// bind commands
generate(program);
watch(program);
setup(program);

// parse arguments
program.parse(process.argv);

// display help command
if (!process.argv.slice(2).length) {
  program.help();
}
