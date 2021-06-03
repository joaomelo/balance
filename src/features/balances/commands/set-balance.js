import { createUuid } from '../../../app/ids';
import { validateBalance } from '../body';

export async function setBalanceCommand (dependencies, payload) {
  const {
    balancesMutations,
    activeAccountsSelector,
    activeBalancesSelector,
    userIdSelector
  } = dependencies;

  validateBalance({
    accounts: activeAccountsSelector.current,
    balances: activeBalancesSelector.current
  }, payload);

  const balance = {
    id: createUuid(),
    user: userIdSelector.current,
    ...payload
  };

  await balancesMutations.set(balance);
}
