import { createDel } from './del';
import { createSet } from './set';

export function createMutations (collection) {
  return {
    set: createSet(collection),
    del: createDel(collection)
  };
}
