import { select } from '../../../app/query';

export function selectBalancesWithAccount (
  activeBalancesSelector,
  activeAccountsSelector
) {
  const project = ([balances, accounts]) => {
    return balances.map(b => {
      const account = accounts.find(a => a.id === b.accountId);
      return {
        ...b,
        accountName: account.name
      };
    });
  };

  return select([activeBalancesSelector, activeAccountsSelector], project);
}
