import { createActions } from "../services/firestore";

import { createAuthCommands } from "../features/auth";
import { createAccountsCommands } from "../features/accounts";
import { createBalancesCommands } from "../features/balances";
import { createGroupsCommands } from "../features/groups";

export function createCommands({
  dbDriver,
  authDriver,
  groupsQuery,
  accountsQuery,
  balancesQuery,
  userQueries,
}) {
  const authCommands = createAuthCommands({ authDriver });

  const col = (name) => dbDriver.collection(name);
  const { userIdStream } = userQueries;

  const accountsActions = createActions(col("accounts"));
  const balancesActions = createActions(col("balances"));
  const groupsActions = createActions(col("groups"));

  const accountsCommands = createAccountsCommands({
    accountsQuery,
    accountsActions,
    balancesQuery,
    balancesActions,
    userIdStream,
  });
  const balancesCommands = createBalancesCommands({
    accountsQuery,
    balancesQuery,
    balancesActions,
    userIdStream,
  });
  const groupsCommands = createGroupsCommands({
    accountsQuery,
    accountsActions,
    groupsActions,
    groupsQuery,
    userIdStream,
  });

  return {
    authCommands,
    accountsCommands,
    balancesCommands,
    groupsCommands,
  };
}
