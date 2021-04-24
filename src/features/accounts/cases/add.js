import { createUuid } from '../../../app/ids';

export function addCase (accountData, dependencies) {
  const { accountsRepository, authStore } = dependencies;

  const account = {
    id: createUuid(),
    user: authStore.getters.userId,
    ...accountData
  };

  return accountsRepository.add(account);
}
