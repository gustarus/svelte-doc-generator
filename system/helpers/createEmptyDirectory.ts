import * as fs from 'fs-extra';

export default function createEmptyDirectory(path: string) {
  fs.existsSync(path) && fs.removeSync(path);
  fs.mkdirSync(path, { recursive: true });
}
