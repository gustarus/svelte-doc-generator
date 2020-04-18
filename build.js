import fs from 'fs';
import glob from 'glob';
import path from 'path';
import postcss from 'postcss';
import { preprocess } from 'svelte/compiler';

const { plugins } = require('./postcss.config');

const PATH_TO_SOURCE = path.resolve('interface');
const PATH_TO_TARGET = path.resolve('build', 'interface');

// start processing chain
let chain = Promise.resolve();

// process svelte components
const components = glob.sync(`${PATH_TO_SOURCE}/**/*.svelte`);
chain = components.reduce((chain, pathToSource) => chain.then(async () => {
  const pathRelative = path.relative(PATH_TO_SOURCE, pathToSource);
  const pathToTarget = path.resolve(PATH_TO_TARGET, pathRelative);

  // get content of the component
  const source = fs.readFileSync(pathToSource).toString();

  // process component with preprocessors
  const { code } = await preprocess(source, {
    style: ({ content, attributes }) => {
      if (attributes.lang !== 'postcss') {
        return;
      }

      return postcss(plugins).process(content, {
        from: pathToSource,
        to: pathToTarget
      }).then((result) => ({
        code: result.css.toString()
      }));
    }
  }, {
    filename: pathRelative
  });

  // create target folder
  fs.mkdirSync(path.dirname(pathToTarget), { recursive: true });

  // save just preprocessed code to the target folder
  fs.writeFileSync(pathToTarget, code);
}), chain);

// process js files
const scripts = glob.sync(`${PATH_TO_SOURCE}/**/*.js`);
chain = scripts.reduce((chain, pathToSource) => chain.then(async () => {
  const pathRelative = path.relative(PATH_TO_SOURCE, pathToSource);
  const pathToTarget = path.resolve(PATH_TO_TARGET, pathRelative);

  // create target folder
  fs.mkdirSync(path.dirname(pathToTarget), { recursive: true });

  // copy source file
  fs.copyFileSync(pathToSource, pathToTarget);
}), chain);

// process postcss files
const styles = glob.sync(`${PATH_TO_SOURCE}/**/*.pcss`);
chain = styles.reduce((chain, pathToSource) => chain.then(async () => {
  const pathRelative = path.relative(PATH_TO_SOURCE, pathToSource);
  const pathToTarget = path.resolve(PATH_TO_TARGET, path.dirname(pathRelative), `${path.basename(pathRelative, '.pcss')}.css`);

  // get content of the component
  const source = fs.readFileSync(pathToSource).toString();

  const { code } = await postcss(plugins).process(source, {
    from: pathToSource,
    to: pathToTarget
  }).then((result) => ({
    code: result.css.toString()
  }));

  // create target folder
  fs.mkdirSync(path.dirname(pathToTarget), { recursive: true });

  // save just preprocessed code to the target folder
  fs.writeFileSync(pathToTarget, code);
}), chain);
