import { createUuid } from '../../../app/ids';
import { validateAccount } from '../body';

export async function setAccountCommand (dependencies, payload) {
  const {
    accountsMutations,
    accounts,
    userId
  } = dependencies;

  validateAccount({ accounts }, payload);

  const account = {
    id: createUuid(),
    user: userId,
    ...payload
  };

  await accountsMutations.set(account);
}
