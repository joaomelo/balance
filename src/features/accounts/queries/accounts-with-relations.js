import { select } from '../../../app/query';

export function selectAccountsWithRelations (
  accountsSelector,
  groupsSelector,
  balancesSelector
) {
  return select(
    [
      accountsSelector,
      groupsSelector,
      balancesSelector
    ],
    accountsWithRelationsProject
  );
}

function accountsWithRelationsProject ([
  accounts,
  groups,
  balances
]) {
  return accounts.map(a => ({
    ...a,
    groupName: mapGroupName(groups, a),
    balances: mapBalances(balances, a)
  }));
}

function mapGroupName (groups, account) {
  const group = groups.find(g => g.id === account.groupId);
  const name = group ? group.name : null;
  return name;
}

function mapBalances (balances, account) {
  return balances.filter(b => b.accountId === account.id);
}
