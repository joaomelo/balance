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
    groupsRelationalProject
  );
}

export function groupsRelationalProject ([
  groups,
  accounts,
  balances
]) {
  // const isAccountInGroup = (account, )

  // const accountsProject = group => accounts
  //   .filter(a => a.groups.includes(group.id))
  //   .map(a => a.name)

  //   const balancesProject = group => balances
  //   .filter(b => accounts.find(a => b.accountId a.groups.includes(group.id))
  //   .map(a => a.name)

  return groups.map(g => ({
    ...g,
    accounts: mapAccounts(accounts, g),
    balances: mapBalances(balances, g)
  }));
}

function mapAccounts (accounts, group) {
  return [];
}

function mapBalances (balances, group) {
  return [];
}
