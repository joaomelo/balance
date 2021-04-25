import { createEntityStore, createUserFilter } from '../../../app/store';

export function createBalancesStore (balancesRepository, authStore) {
  return createEntityStore({
    repository: balancesRepository,
    filters: [createUserFilter(authStore)],
    authStore
  });
}
