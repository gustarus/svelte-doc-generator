import * as path from 'path';
import { DOCUMENTATION_PATH_EXTENSION, DOCUMENTATION_PATH_SUFFIX } from "../constants";

export default function resolveDocumentationComponentPath(componentPath: string): string {
  const { dir, name } = path.parse(componentPath);
  return path.resolve(dir, `${name}${DOCUMENTATION_PATH_SUFFIX}.${DOCUMENTATION_PATH_EXTENSION}`);
}
