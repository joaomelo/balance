import { createEntityStore, createUserFilter } from '../../../app/store';

export function createAccountsStore (accountsRepository, authStore) {
  return createEntityStore({
    repository: accountsRepository,
    filters: [createUserFilter(authStore)],
    authStore
  });
}
