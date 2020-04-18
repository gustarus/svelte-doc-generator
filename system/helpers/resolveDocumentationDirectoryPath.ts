import * as path from 'path';
import * as fs from 'fs-extra';
import { DOCUMENTATION_PATH_SUFFIX } from "../constants";

export default function resolveDocumentationDirectoryPath(componentPath: string): string {
  const { dir, name } = path.parse(componentPath);
  return path.resolve(dir, `${name}${DOCUMENTATION_PATH_SUFFIX}`);
}
