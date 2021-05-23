import { createDel } from './del';
import { createSet } from './set';

export function createRepositoryCommands (collection) {
  return {
    set: createSet(collection),
    del: createDel(collection)
  };
}
