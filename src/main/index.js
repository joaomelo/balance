import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { initFirebaseSuiteFromEnv } from '../app/firebase';
import { createCommands, storeQuery } from '../app/repository';
import { createIdentityService } from '../app/identity';
import { syncRepositoryWithAuth } from '../features/sync-repo-identity';
import { authServiceConfig } from '../features/auth';
import { accountsServiceConfig } from '../features/accounts';
import { balancesServiceConfig } from '../features/balances';
import { mountRoot } from '../features/root';

async function main () {
  const { firestore, fireauth } = await initFirebaseSuiteFromEnv();

  const authService = createIdentityService(fireauth, authServiceConfig);

  const createRepositoryService = await createCommands(firestore);
  const accountsService = createRepositoryService('accounts', accountsServiceConfig);
  const balancesService = createRepositoryService('balances', balancesServiceConfig);

  syncRepositoryWithAuth(authService, accountsService);
  syncRepositoryWithAuth(authService, balancesService);

  const dependencies = {
    authService,
    accountsService,
    balancesService
  };

  // dependencies exposed globally to facilitate tests and debug
  window.$dependencies = dependencies;

  mountRoot({
    element: 'container',
    dependencies
  });
}

main();
