import { select } from '../../../app/query';

export function selectAccountsWithBalances (
  activeAccountsSelector,
  activeBalancesSelector
) {
  const project = ([accounts, balances]) =>
    accounts.map(a => ({
      ...a,
      balances: balances.filter(b => b.accountId === a.id)
    }));

  return select([activeAccountsSelector, activeBalancesSelector], project);
}
