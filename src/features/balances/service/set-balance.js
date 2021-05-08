import { createUuid } from '../../../app/ids';
import { validateBalance } from '../body';

export function setBalanceCase (balancesService, accountsService, authService, balanceData) {
  const balances = balancesService.activeItems();
  const accounts = accountsService.activeItems();

  validateBalance(balanceData, balances, accounts);

  const balance = {
    id: createUuid(),
    user: authService.userId(),
    ...balanceData
  };

  return balancesService.set(balance);
}
