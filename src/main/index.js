import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { initFirebaseSuiteFromEnv } from '../app/firebase';
import { createIdentityCommands, queryUser, selectUserId, selectIsSignedIn } from '../app/identity';
import { createRepositoryCommands, queryRepoWithUser } from '../app/repository';
import { mountRoot } from '../features/root';

async function main () {
  const { firestore, fireauth } = await initFirebaseSuiteFromEnv();

  const identityCommands = createIdentityCommands(fireauth);
  const userQuery = queryUser(fireauth);
  const userIdSelector = selectUserId(userQuery);
  const isSignedInSelector = selectIsSignedIn(userQuery);

  const accountsCollection = firestore.collection('accounts');
  const accountsCommands = createRepositoryCommands(accountsCollection);
  const accountsQuery = queryRepoWithUser(userIdSelector, accountsCollection);

  const balancesCollection = firestore.collection('balances');
  const balancesCommands = createRepositoryCommands(balancesCollection);
  const balancesQuery = queryRepoWithUser(userIdSelector, balancesCollection);

  const dependencies = {
    identityCommands,
    userQuery,
    userIdSelector,
    isSignedInSelector,
    accountsCommands,
    accountsQuery,
    balancesCommands,
    balancesQuery
  };

  // dependencies exposed globally to facilitate tests and debug
  window.$dependencies = dependencies;

  mountRoot({
    element: 'container',
    dependencies
  });
}

main();
