import { setBalanceCase } from './set-balance';

export const balancesServiceConfig = {
  selectors: {
    accountBalances: ({ activeItems }, accountId) =>
      activeItems().filter(b => b.accountId === accountId),
    accountLatestBalance: ({ accountBalances }, accountId) => {
      const balances = accountBalances(accountId);
      if (balances.length === 0) return null;

      return balances.reduce((a, b) => a.date.getTime() > b.date.getTime() ? a : b);
    }
  },
  actions: {
    setBalanceCase,
    delBalancesCase: ({ del }, ids) => del(ids)
  }
};
