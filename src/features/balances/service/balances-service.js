import { setBalanceCase } from './set-balance';

export const balancesServiceConfig = {
  selectors: {
    accountBalances: ({ activeItems }, accountId) =>
      activeItems().filter(b => b.accountId === accountId)
  },
  actions: {
    setBalanceCase,
    delBalancesCase: ({ del }, ids) => del(ids)
  }
};
