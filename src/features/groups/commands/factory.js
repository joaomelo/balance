import { createDelGroup } from "./del";
import { createSetGroup } from "./set";

export function createGroupsCommands(dependencies) {
  return {
    del: createDelGroup(dependencies),
    set: createSetGroup(dependencies),
  };
}
