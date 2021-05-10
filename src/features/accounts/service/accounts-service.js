import { setAccountCase } from './set-account';
import { delAccountCase } from './del-account';

export const accountsServiceConfig = {
  selectors: {
    accountsWithLatestBalance: ({ activeItems }, balancesService) => {
      return activeItems().map(a => {
        const balance = balancesService.accountLatestBalance(a.id);
        return {
          ...a,
          date: balance?.date,
          amount: balance?.amount
        };
      });
    }
  },
  actions: {
    setAccountCase,
    delAccountCase
  }
};
