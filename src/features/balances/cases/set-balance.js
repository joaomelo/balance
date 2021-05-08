import { createUuid } from '../../../app/ids';
import { validateBalance } from '../body';

export function setBalanceCase (balanceData, dependencies) {
  const {
    balancesService,
    identityService,
    balancesStore,
    accountsStore
  } = dependencies;

  const balances = balancesStore.getters.activeItems;
  const accounts = accountsStore.getters.activeItems;

  validateBalance(balanceData, balances, accounts);

  const balance = {
    id: createUuid(),
    user: identityService.getters.userId,
    ...balanceData
  };

  return balancesService.set(balance);
}
