import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { initFirebaseSuiteFromEnv } from '../app/firebase';
import { createRepositoryServiceFactory } from '../app/repository';
import { createIdentityService } from '../app/identity';
import { createAccountsRepository } from '../features/accounts';
import { createBalancesRepository } from '../features/balances';
import { mountRoot } from '../features/root';

async function main () {
  const { firestore, fireauth } = await initFirebaseSuiteFromEnv();

  const identityService = createIdentityService(fireauth);

  const createRepositoryService = await createRepositoryServiceFactory(firestore);
  const accountsRepository = createAccountsRepository(createRepositoryService, identityService);
  const balancesRepository = createBalancesRepository(createRepositoryService, identityService);

  const dependencies = {
    identityService,
    accountsRepository,
    balancesRepository
  };

  // dependencies exposed globally to facilitate tests and debug
  window.$dependencies = dependencies;

  mountRoot({
    element: 'container',
    dependencies
  });
}

main();
