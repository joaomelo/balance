// import {
//   createActions,
//   queryRepoWithUser,
//   selectActiveItems,
// } from "../services/repository";

import { createAuthCommands, createUserQueries } from "../features/auth";
// import {
//   messagesAccount,
//   createFlatAccountsQuery,
//   selectAccountsWithRelationships,
// } from "../features/accounts";
// import {
//   messagesBalance,
//   selectBalancesWithRelationships,
// } from "../features/balances";
// import {
//   messagesGroups,
//   selectGroupsWithRelationships,
// } from "../features/groups";
// import { selectComposedHistory } from "../features/history";

export async function createDependencies({ dbDriver, authDriver }) {
  const authCommands = createAuthCommands({ authDriver });
  const userQueries = createUserQueries({ authDriver });

  // const accountsCollection = dbDriver.collection("accounts");
  // const accountsActions = createActions(accountsCollection);
  // const flatAccountsQuery = createFlatAccountsQuery(
  //   accountsCollection,
  //   authDriver
  // );

  // const balancesCollection = dbDriver.collection("balances");
  // const balancesActions = createActions(balancesCollection);
  // const balancesQuery = queryRepoWithUser(
  //   identityService.userIdStream,
  //   balancesCollection.orderBy("date", "desc")
  // );
  // const activeBalancesSelector = selectActiveItems(balancesQuery);

  // const groupsCollection = dbDriver.collection("groups");
  // const groupsMutations = createActions(groupsCollection);
  // const groupsQuery = queryRepoWithUser(
  //   identityService.userIdStream,
  //   groupsCollection.orderBy("name")
  // );
  // const activeGroupsSelector = selectActiveItems(groupsQuery);

  // const balancesWithRelationshipsSelector = selectBalancesWithRelationships(
  //   activeBalancesSelector,
  //   flatAccountsQuery
  // );

  // const accountsWithRelationshipsSelector = selectAccountsWithRelationships(
  //   flatAccountsQuery,
  //   activeGroupsSelector,
  //   activeBalancesSelector
  // );

  // const groupsWithRelationshipsSelector = selectGroupsWithRelationships(
  //   activeGroupsSelector,
  //   flatAccountsQuery,
  //   activeBalancesSelector
  // );

  // const composedHistorySelector = selectComposedHistory(
  //   groupsWithRelationshipsSelector,
  //   accountsWithRelationshipsSelector
  // );

  const dependencies = {
    authCommands,
    userQueries,
    // accountsActions,
    // accountsWithRelationshipsSelector,
    // balancesActions,
    // balancesWithRelationshipsSelector,
    // groupsMutations,
    // groupsWithRelationshipsSelector,
    // composedHistorySelector,
  };

  return dependencies;
}
