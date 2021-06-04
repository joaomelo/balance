import { createUuid } from '../../../app/ids';
import { validateAccount } from '../body';

export async function setAccountCommand (dependencies, payload) {
  const {
    accountsMutations,
    activeAccountsSelector,
    userIdSelector
  } = dependencies;

  validateAccount({
    accounts: activeAccountsSelector.current
  }, payload);

  const account = {
    id: createUuid(),
    user: userIdSelector.current,
    ...payload
  };

  await accountsMutations.set(account);
}