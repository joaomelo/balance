import { createUuid } from '../../../app/ids';
import { validateAccount } from '../body';

export async function setAccountCase (accountData, dependencies) {
  const {
    accountsRepository,
    identityService,
    accountsStore
  } = dependencies;

  const accounts = accountsStore.getters.activeItems;

  validateAccount(accountData, accounts);

  const account = {
    id: createUuid(),
    user: identityService.getters.userId,
    ...accountData
  };

  await accountsRepository.set(account);
}
