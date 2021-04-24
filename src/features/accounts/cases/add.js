import { createUuid } from '../../../app/ids';

export function addCase (accountData, dependencies) {
  const { accountRepository, authStore } = dependencies;

  const account = {
    id: createUuid(),
    creator: authStore.getters.userId,
    ...accountData
  };

  return accountRepository.add(account);
}
