import { createUserQueries } from "../features/auth";
import {
  createFlatAccountsQuery,
  createAccountsQuery,
} from "../features/accounts";
import {
  createFlatBalancesQuery,
  createBalancesQuery,
} from "../features/balances";
import { createFlatGroupsQuery, createGroupsQuery } from "../features/groups";
import { createHistoryQuery } from "../features/history";

export function createQueries({ dbDriver, authDriver }) {
  const userQueries = createUserQueries({ authDriver });
  const { userIdStream } = userQueries;

  const flatAccountsQuery = createFlatAccountsQuery(dbDriver, userIdStream);
  const flatBalancesQuery = createFlatBalancesQuery(dbDriver, userIdStream);
  const flatGroupsQuery = createFlatGroupsQuery(dbDriver, userIdStream);

  const accountsQuery = createAccountsQuery(
    flatAccountsQuery,
    flatBalancesQuery,
    flatGroupsQuery
  );
  const balancesQuery = createBalancesQuery(
    flatBalancesQuery,
    flatAccountsQuery
  );
  const groupsQuery = createGroupsQuery(
    flatGroupsQuery,
    flatAccountsQuery,
    flatBalancesQuery
  );
  const historyQuery = createHistoryQuery(groupsQuery, accountsQuery);

  return {
    userQueries,
    accountsQuery,
    balancesQuery,
    groupsQuery,
    historyQuery,
  };
}
