import { createDelAccount } from "./del";
import { createSetAccount } from "./set";

export function createAccountsCommands(dependencies) {
  return {
    del: createDelAccount(dependencies),
    set: createSetAccount(dependencies),
  };
}
