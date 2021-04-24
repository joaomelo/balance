import { createEntityStore } from '../../../app/store';

export function createAccountsStore (accountsRepository, authStore) {
  return createEntityStore({
    repository: accountsRepository,
    filters: [createUserFilter(authStore)],
    authStore
  });
}

function createUserFilter (authStore) {
  return () => {
    const userId = authStore.getters.userId;
    return {
      field: 'user',
      operator: '==',
      value: userId
    };
  };
}
