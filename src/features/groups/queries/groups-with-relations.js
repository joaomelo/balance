import { select } from '../../../app/query';

export function selectGroupsWithRelations (
  groupsSelector,
  accountsSelector,
  balancesSelector
) {
  return select(
    [
      groupsSelector,
      accountsSelector,
      balancesSelector
    ],
    groupsWithRelationsProject
  );
}

export function groupsWithRelationsProject ([
  groups,
  accounts,
  balances
]) {
  return groups.map(g => ({
    ...g,
    accounts: mapAccounts(accounts, g),
    balances: mapBalances(accounts, balances, g)
  }));
}

function mapAccounts (accounts, group) {
  return accounts.filter(a => a.groupId === group.id);
}

function mapBalances (accounts, balances, group) {
  const accountIds = mapAccounts(accounts, group)
    .map(({ id }) => id);

  return balances
    .filter(({ accountId }) => accountIds.includes(accountId));
}
