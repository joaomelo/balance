import { createDelBalance } from "./del";
import { createSetBalance } from "./set";

export function createBalancesCommands(dependencies) {
  return {
    del: createDelBalance(dependencies),
    set: createSetBalance(dependencies),
  };
}
