import { select } from "../../../libs/stream";
import { projectGroups } from "../body";

export function createGroupsQuery(
  groupsSelector,
  accountsSelector,
  balancesSelector
) {
  return select(
    [groupsSelector, accountsSelector, balancesSelector],
    (values) => projectGroups(...values)
  );
}
