import { createDel } from './del';
import { createSet } from './set';

export function createRepositoryMutations (collection) {
  return {
    set: createSet(collection),
    del: createDel(collection)
  };
}
