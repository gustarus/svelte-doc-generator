import * as path from 'path';
import * as fs from 'fs-extra';
import resolveDocumentationDirectoryPath from './resolveDocumentationDirectoryPath';
import { DOCUMENTATION_PATH_EXTENSION, DOCUMENTATION_PATH_SUFFIX } from "../constants";

export default function resolveDocumentationDirectoryComponentPath(componentPath: string): string {
  const { dir, name } = path.parse(componentPath);
  return path.resolve(dir, `${name}${DOCUMENTATION_PATH_SUFFIX}`, `${name}${DOCUMENTATION_PATH_SUFFIX}.${DOCUMENTATION_PATH_EXTENSION}`);
}
