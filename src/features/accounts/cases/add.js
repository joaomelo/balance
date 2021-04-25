import { createUuid } from '../../../app/ids';
import { validateAccount } from '../body';

export async function addCase (accountData, dependencies) {
  const { accountsRepository, authStore, accountsStore } = dependencies;

  const accounts = accountsStore.getters.allItems;
  validateAccount(accountData, accounts);

  const account = {
    id: createUuid(),
    user: authStore.getters.userId,
    ...accountData
  };

  await accountsRepository.add(account);
}
