import "core-js/stable";
import "regenerator-runtime/runtime";

import { initI18nProvider, messagesCommon } from "../libs/i18n";
import { createIdentityService } from "../services/identity";
import {
  createActions,
  queryRepoWithUser,
  selectActiveItems,
} from "../services/repository";
import { mountRoot } from "../features/root";
import { messagesAuth } from "../features/auth";
import {
  messagesAccount,
  createFlatAccountsQuery,
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
  const accountsActions = createActions(accountsCollection);
  const flatAccountsQuery = createFlatAccountsQuery(
    accountsCollection,
    identityDriver
  );

  const balancesCollection = dbDriver.collection("balances");
  const balancesActions = createActions(balancesCollection);
  const balancesQuery = queryRepoWithUser(
    identityService.userIdStream,
    balancesCollection.orderBy("date", "desc")
  );
  const activeBalancesSelector = selectActiveItems(balancesQuery);

  const groupsCollection = dbDriver.collection("groups");
  const groupsMutations = createActions(groupsCollection);
  const groupsQuery = queryRepoWithUser(
    identityService.userIdStream,
    groupsCollection.orderBy("name")
  );
  const activeGroupsSelector = selectActiveItems(groupsQuery);

  const balancesWithRelationshipsSelector = selectBalancesWithRelationships(
    activeBalancesSelector,
    flatAccountsQuery
  );

  const accountsWithRelationshipsSelector = selectAccountsWithRelationships(
    flatAccountsQuery,
    activeGroupsSelector,
    activeBalancesSelector
  );

  const groupsWithRelationshipsSelector = selectGroupsWithRelationships(
    activeGroupsSelector,
    flatAccountsQuery,
    activeBalancesSelector
  );

  const composedHistorySelector = selectComposedHistory(
    groupsWithRelationshipsSelector,
    accountsWithRelationshipsSelector
  );

  const dependencies = {
    identityService,
    accountsActions,
    accountsWithRelationshipsSelector,
    balancesActions,
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
