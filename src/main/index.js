import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { initI18nProvider, messagesCommon } from '../app/i18n';
import { initFirebaseSuiteFromEnv } from '../app/firebase';
import {
  createIdentityMutations,
  queryUser,
  selectUserId,
  selectIsSignedIn
} from '../app/identity';
import {
  createRepositoryMutations,
  queryRepoWithUser,
  selectActiveItems
} from '../app/repository';
import { mountRoot } from '../features/root';
import { messagesAuth } from '../features/auth';
import {
  messagesAccount,
  selectAccountsWithRelationships
} from '../features/accounts';
import {
  messagesBalance,
  selectBalancesWithAccount
} from '../features/balances';
import {
  messagesGroups,
  selectGroupsWithRelationships
} from '../features/groups';
import { selectComposedHistory } from '../features/history';

async function main () {
  const useI18n = await initI18nProvider([
    messagesCommon,
    messagesAuth,
    messagesBalance,
    messagesAccount,
    messagesGroups
  ]);

  const { firestore, fireauth } = await initFirebaseSuiteFromEnv();

  const identityMutations = createIdentityMutations(fireauth);
  const userQuery = queryUser(fireauth);
  const userIdSelector = selectUserId(userQuery);
  const isSignedInSelector = selectIsSignedIn(userQuery);

  const accountsCollection = firestore.collection('accounts');
  const accountsMutations = createRepositoryMutations(accountsCollection);
  const accountsQuery = queryRepoWithUser(userIdSelector, accountsCollection.orderBy('name'));
  const activeAccountsSelector = selectActiveItems(accountsQuery);

  const balancesCollection = firestore.collection('balances');
  const balancesMutations = createRepositoryMutations(balancesCollection);
  const balancesQuery = queryRepoWithUser(userIdSelector, balancesCollection.orderBy('date', 'desc'));
  const activeBalancesSelector = selectActiveItems(balancesQuery);

  const groupsCollection = firestore.collection('groups');
  const groupsMutations = createRepositoryMutations(groupsCollection);
  const groupsQuery = queryRepoWithUser(userIdSelector, groupsCollection.orderBy('name'));
  const activeGroupsSelector = selectActiveItems(groupsQuery);

  const balancesWithAccountSelector = selectBalancesWithAccount(
    activeBalancesSelector,
    activeAccountsSelector
  );

  const accountsWithRelationshipsSelector = selectAccountsWithRelationships(
    activeAccountsSelector,
    activeGroupsSelector,
    activeBalancesSelector
  );
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
    useI18n,
    identityMutations,
    userQuery,
    userIdSelector,
    isSignedInSelector,
    accountsMutations,
    accountsQuery,
    activeAccountsSelector,
    accountsWithRelationshipsSelector,
    balancesMutations,
    balancesQuery,
    activeBalancesSelector,
    balancesWithAccountSelector,
    groupsMutations,
    activeGroupsSelector,
    groupsWithRelationshipsSelector,
    composedHistorySelector
  };

  // dependencies exposed globally to facilitate tests and debug
  window.$dependencies = dependencies;

  mountRoot({
    element: 'root',
    dependencies
  });
}

main();
