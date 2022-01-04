import { select } from "@joaomelo/stream";
import { projectAccounts } from "../body";

export function createAccountsQuery(
  flatAccountsQuery,
  flatBalancesQuery,
  flatGroupsQuery
) {
  return select(
    [flatAccountsQuery, flatBalancesQuery, flatGroupsQuery],
    (values) => projectAccounts(...values)
  );
}
