import { createEntityStore } from '../../../app/store';

export function createAccountsStore (accountsRepository, authStore) {
  return createEntityStore({
    repository: accountsRepository,
    filters: [],
    authStore
  });
}
