import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { initFirebaseSuiteFromEnv } from '../app/firebase';
import { createRepositoryProvider } from '../app/repository';
import { createAuthStore, createIdentityProvider } from '../features/auth';
import { createAccountsStore } from '../features/accounts';
import { createBalancesStore } from '../features/balances';
import { mountRoot } from '../features/root';

async function main () {
  const suite = initFirebaseSuiteFromEnv();

  const authEmulatorHost = process.env.FIREAUTH_EMULATOR_HOST;
  const identityProvider = await createIdentityProvider({ ...suite, authEmulatorHost });
  const authStore = createAuthStore(identityProvider);

  const firestoreEmulatorHost = process.env.FIRESTORE_EMULATOR_HOST;
  const repositoryProvider = await createRepositoryProvider({ ...suite, firestoreEmulatorHost });

  const accountsRepository = repositoryProvider.repository('accounts');
  const accountsStore = createAccountsStore(accountsRepository, authStore);
  const balancesRepository = repositoryProvider.repository('balances');
  const balancesStore = createBalancesStore(balancesRepository, authStore);

  const dependencies = {
    identityProvider,
    authStore,
    accountsRepository,
    accountsStore,
    balancesRepository,
    balancesStore
  };

  // dependencies exposed globally to facilitate e2e tests
  window.$dependencies = dependencies;

  mountRoot({
    element: 'container',
    dependencies
  });
}

main();
