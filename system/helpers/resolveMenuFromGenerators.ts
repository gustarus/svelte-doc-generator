import Generator from '../models/Generator';
import { ItemType } from '../types/ItemType';

export default function resolveMenuFromGenerators(generators: Generator[]): ItemType[] {
  return generators.map((generator) => {
    return {
      name: generator.name,
      title: generator.documentation.title,
    }
  });
}
