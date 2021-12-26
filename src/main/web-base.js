import "core-js/stable";
import "regenerator-runtime/runtime";

import { initI18nProvider, messagesCommon } from "../libs/i18n";
import { createIdentityService } from "../services/identity";
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

export async function webMainBase({ dbDriver, identityDriver }) {
  await initI18nProvider([
    messagesCommon,
    messagesAuth,
    messagesBalance,
    messagesAccount,
    messagesGroups,
  ]);

  const identityService = createIdentityService(identityDriver);

  const accountsCollection = dbDriver.collection("accounts");
  const accountsMutations = createRepositoryMutations(accountsCollection);
  const accountsQuery = queryRepoWithUser(
    identityService.userIdStream,
    accountsCollection.orderBy("name")
  );
  const activeAccountsSelector = selectActiveItems(accountsQuery);

  const balancesCollection = dbDriver.collection("balances");
  const balancesMutations = createRepositoryMutations(balancesCollection);
  const balancesQuery = queryRepoWithUser(
    identityService.userIdStream,
    balancesCollection.orderBy("date", "desc")
  );
  const activeBalancesSelector = selectActiveItems(balancesQuery);

  const groupsCollection = dbDriver.collection("groups");
  const groupsMutations = createRepositoryMutations(groupsCollection);
  const groupsQuery = queryRepoWithUser(
    identityService.userIdStream,
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
    identityService,
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
