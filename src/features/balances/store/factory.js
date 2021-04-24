import { createEntityStore } from '../../../app/store';

export function createBalancesStore (balancesRepository, authStore) {
  return createEntityStore({
    repository: balancesRepository,
    filters: [],
    authStore
  });
}
