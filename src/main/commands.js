import { createActions } from "../services/firestore";

import { createAuthCommands } from "../features/auth";
import { createAccountsCommands } from "../features/accounts";
import { createBalancesCommands } from "../features/balances";
import { createGroupsCommands } from "../features/groups";

export function createCommands({
  dbDriver,
  authDriver,
  groupsQuery,
  userQueries,
}) {
  const authCommands = createAuthCommands({ authDriver });

  const col = (name) => dbDriver.collection(name);

  const accountsActions = createActions(col("accounts"));
  const accountsCommands = createAccountsCommands(accountsActions);

  const balancesActions = createActions(col("balances"));
  const balancesCommands = createBalancesCommands(balancesActions);

  const groupsActions = createActions(col("groups"));
  const groupsCommands = createGroupsCommands({
    groupsActions,
    groupsQuery,
    userIdStream: userQueries.userIdStream,
  });

  return {
    authCommands,
    accountsCommands,
    balancesCommands,
    groupsCommands,
  };
}
