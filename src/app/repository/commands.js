import { createDel } from './del';
import { createSet } from './set';

export function createIdentityCommands (collection) {
  return {
    set: createSet(collection),
    del: createDel(collection)
  };
}
