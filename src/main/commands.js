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
//   createGroupsQuery,
// } from "../features/groups";
// import { createHistoryQuery } from "../features/history";

export function createCommands({ dbDriver, authDriver }) {
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
  // const flatBalancesQuery = selectActiveItems(balancesQuery);

  // const groupsCollection = dbDriver.collection("groups");
  // const groupsMutations = createActions(groupsCollection);
  // const groupsQuery = queryRepoWithUser(
  //   identityService.userIdStream,
  //   groupsCollection.orderBy("name")
  // );
  // const flatGroupsQuery = selectActiveItems(groupsQuery);

  // const balancesQuery = selectBalancesWithRelationships(
  //   flatBalancesQuery,
  //   flatAccountsQuery
  // );

  // const accountsQuery = selectAccountsWithRelationships(
  //   flatAccountsQuery,
  //   flatGroupsQuery,
  //   flatBalancesQuery
  // );

  // const groupsQuery = createGroupsQuery(
  //   flatGroupsQuery,
  //   flatAccountsQuery,
  //   flatBalancesQuery
  // );

  // const historyQuery = createHistoryQuery(
  //   groupsQuery,
  //   accountsQuery
  // );

  const dependencies = {
    authCommands,
    userQueries,
    // accountsActions,
    // accountsQuery,
    // balancesActions,
    // balancesQuery,
    // groupsMutations,
    // groupsQuery,
    // historyQuery,
  };

  return dependencies;
}
