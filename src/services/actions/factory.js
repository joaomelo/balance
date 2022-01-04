import { createDel } from "./del";
import { createSet } from "./set";

export function createActions(collection) {
  return {
    set: createSet(collection),
    del: createDel(collection),
  };
}
