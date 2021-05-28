import 'core-js/stable';
import 'regenerator-runtime/runtime';

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
import { selectAccountsWithBalances } from '../features/accounts';

async function main () {
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

  const accountsWithBalancesSelector = selectAccountsWithBalances(
    activeAccountsSelector,
    activeBalancesSelector
  );

  const dependencies = {
    identityMutations,
    userQuery,
    userIdSelector,
    isSignedInSelector,
    accountsMutations,
    accountsQuery,
    activeAccountsSelector,
    balancesMutations,
    balancesQuery,
    activeBalancesSelector,
    accountsWithBalancesSelector
  };

  // dependencies exposed globally to facilitate tests and debug
  window.$dependencies = dependencies;

  mountRoot({
    element: 'container',
    dependencies
  });
}

main();
