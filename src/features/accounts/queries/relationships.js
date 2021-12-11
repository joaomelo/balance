import { select } from "@joaomelo/stream";
import { projectAccountsWithRelationships } from "../body";

export function selectAccountsWithRelationships(
  accountsSelector,
  groupsSelector,
  balancesSelector
) {
  return select(
    [accountsSelector, groupsSelector, balancesSelector],
    (values) => projectAccountsWithRelationships(...values)
  );
}
