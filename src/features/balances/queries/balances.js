import { select } from "../../../libs/stream";
import { projectBalances } from "../body";

export function createBalancesQuery(flatBalancesQuery, flatAccountsQuery) {
  return select([flatBalancesQuery, flatAccountsQuery], (values) =>
    projectBalances(...values)
  );
}
