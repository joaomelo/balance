import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { initFirebaseSuiteFromEnv } from '../app/firebase';
import { createRepositoryProvider } from '../app/repository';
import { createAuthStore, createIdentityProvider } from '../features/auth';
import { createArcsStore, createArcsRepository } from '../features/arcs';
import { createChallengesRepository, createChallengesStore } from '../features/challenges';
import { mountRoot } from '../features/root';

async function main () {
  const suite = initFirebaseSuiteFromEnv();

  const authEmulatorHost = process.env.FIREAUTH_EMULATOR_HOST;
  const identityProvider = await createIdentityProvider({ ...suite, authEmulatorHost });
  const authStore = createAuthStore(identityProvider);

  const firestoreEmulatorHost = process.env.FIRESTORE_EMULATOR_HOST;
  const repositoryProvider = await createRepositoryProvider({ ...suite, firestoreEmulatorHost });

  const arcsRepository = createArcsRepository(repositoryProvider);
  const arcsStore = createArcsStore(arcsRepository, authStore);
  const challengesRepository = createChallengesRepository(repositoryProvider);
  const challengesStore = createChallengesStore(challengesRepository, authStore);

  const dependencies = {
    identityProvider,
    authStore,
    arcsRepository,
    arcsStore,
    challengesRepository,
    challengesStore
  };

  // dependencies exposed globally to facilitate e2e tests
  window.$dependencies = dependencies;

  mountRoot({
    element: 'container',
    dependencies
  });
}

main();
