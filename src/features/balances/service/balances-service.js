import { setBalanceCase } from './set-balance';

export const balancesServiceConfig = {
  actions: {
    setBalanceCase,
    delBalanceCase: ({ del }, id) => del(id)
  }
};
