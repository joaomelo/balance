import { createUuid } from '../../../app/ids';
import { validateBalance } from '../body';

export function setBalanceCase (balanceData, dependencies) {
  const {
    balancesRepository,
    authStore,
    balancesStore,
    accountsStore
  } = dependencies;

  const balances = balancesStore.getters.activeItems;
  const accounts = accountsStore.getters.activeItems;

  validateBalance(balanceData, balances, accounts);

  const balance = {
    id: createUuid(),
    user: authStore.getters.userId,
    ...balanceData
  };

  return balancesRepository.set(balance);
}
