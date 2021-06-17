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
import { selectAccountsWithBalances } from '../features/accounts';
import { messagesBalance, selectBalancesWithAccount } from '../features/balances';

async function main () {
  const useI18n = await initI18nProvider([
    messagesCommon,
    messagesAuth,
    messagesBalance
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

  const accountsWithBalancesSelector = selectAccountsWithBalances(
    activeAccountsSelector,
    activeBalancesSelector
  );
  const balancesWithAccountSelector = selectBalancesWithAccount(
    activeBalancesSelector,
    activeAccountsSelector
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
    accountsWithBalancesSelector,
    balancesMutations,
    balancesQuery,
    activeBalancesSelector,
    balancesWithAccountSelector
  };

  // dependencies exposed globally to facilitate tests and debug
  window.$dependencies = dependencies;

  mountRoot({
    element: 'root',
    dependencies
  });
}

main();
