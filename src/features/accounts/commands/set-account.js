import { createUuid } from '../../../app/ids';
import { validateAccount } from '../body';

// import { delay } from '../../../app/helpers';

export async function setAccountCommand (dependencies, payload) {
  // await delay(5);
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
