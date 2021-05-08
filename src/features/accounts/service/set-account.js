import { createUuid } from '../../../app/ids';
import { validateAccount } from '../body';

export async function setAccountCase (accountsService, identityService, accountData) {
  const accounts = accountsService.activeItems();

  validateAccount(accountData, accounts);

  const account = {
    id: createUuid(),
    user: identityService.userId(),
    ...accountData
  };

  await accountsService.set(account);
}
