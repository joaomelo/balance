import "core-js/stable";
import "regenerator-runtime/runtime";

import { initI18nProvider, messagesCommon } from "../libs/i18n";
import {
  createIdentityMutations,
  queryUser,
  selectUserId,
  selectIsSignedIn,
} from "../services/identity";
import {
  createRepositoryMutations,
  queryRepoWithUser,
  selectActiveItems,
} from "../services/repository";
import { mountRoot } from "../features/root";
import { messagesAuth } from "../features/auth";
import {
  messagesAccount,
  selectAccountsWithRelationships,
} from "../features/accounts";
import {
  messagesBalance,
  selectBalancesWithRelationships,
} from "../features/balances";
import {
  messagesGroups,
  selectGroupsWithRelationships,
} from "../features/groups";
import { selectComposedHistory } from "../features/history";

export async function webMainBase({ dbService, authService }) {
  await initI18nProvider([
    messagesCommon,
    messagesAuth,
    messagesBalance,
    messagesAccount,
    messagesGroups,
  ]);

  const identityMutations = createIdentityMutations(authService);
  const userQuery = queryUser(authService);
  const userIdSelector = selectUserId(userQuery);
  const isSignedInSelector = selectIsSignedIn(userQuery);

  const accountsCollection = dbService.collection("accounts");
  const accountsMutations = createRepositoryMutations(accountsCollection);
  const accountsQuery = queryRepoWithUser(
    userIdSelector,
    accountsCollection.orderBy("name")
  );
  const activeAccountsSelector = selectActiveItems(accountsQuery);
  console.log({
    activeAccountsSelector: activeAccountsSelector.current,
    accountsQuery: accountsQuery.current,
  });

  const balancesCollection = dbService.collection("balances");
  const balancesMutations = createRepositoryMutations(balancesCollection);
  const balancesQuery = queryRepoWithUser(
    userIdSelector,
    balancesCollection.orderBy("date", "desc")
  );
  const activeBalancesSelector = selectActiveItems(balancesQuery);

  const groupsCollection = dbService.collection("groups");
  const groupsMutations = createRepositoryMutations(groupsCollection);
  const groupsQuery = queryRepoWithUser(
    userIdSelector,
    groupsCollection.orderBy("name")
  );
  const activeGroupsSelector = selectActiveItems(groupsQuery);

  const balancesWithRelationshipsSelector = selectBalancesWithRelationships(
    activeBalancesSelector,
    activeAccountsSelector
  );

  const accountsWithRelationshipsSelector = selectAccountsWithRelationships(
    activeAccountsSelector,
    activeGroupsSelector,
    activeBalancesSelector
  );
  console.log({
    accountsWithRelationshipsSelector,
    activeAccountsSelector,
    activeGroupsSelector,
    activeBalancesSelector,
  });

  const groupsWithRelationshipsSelector = selectGroupsWithRelationships(
    activeGroupsSelector,
    activeAccountsSelector,
    activeBalancesSelector
  );

  const composedHistorySelector = selectComposedHistory(
    groupsWithRelationshipsSelector,
    accountsWithRelationshipsSelector
  );

  const dependencies = {
    identityMutations,
    userIdSelector,
    isSignedInSelector,
    accountsMutations,
    accountsWithRelationshipsSelector,
    balancesMutations,
    balancesWithRelationshipsSelector,
    groupsMutations,
    groupsWithRelationshipsSelector,
    composedHistorySelector,
  };

  mountRoot({
    element: "root",
    dependencies,
  });

  return dependencies;
}
