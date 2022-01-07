import { select } from "../../../libs/stream";
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
