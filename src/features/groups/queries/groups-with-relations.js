import { isSameDay } from '../../../app/helpers';
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
    balances: consolidateBalances(accounts, balances, g)
  }));
}

function mapAccounts (accounts, group) {
  return accounts.filter(a => a.groupId === group.id);
}

function consolidateBalances (accounts, balances, group) {
  const accountsIds = mapAccounts(accounts, group).map(({ id }) => id);
  const accountsBalances = filterBalances(accountsIds, balances);
  const normalizedBalances = normalizeBalances(accountsIds, accountsBalances);
  return normalizedBalances;
}

function filterBalances (accountsIds, balances) {
  return balances
    .filter(({ accountId }) => accountsIds.includes(accountId))
    .sort((a, b) => b.date - a.date);
}

function normalizeBalances (accountIds, accountsBalances) {
  const uniqueDates = distinguishDates(accountsBalances);

  return uniqueDates.reduce((acc, date) => {
    // para cada conta encontrar o balanço menor ou igual
    // se houve acumular
    // se não houver manter
  }, []);
}

function distinguishDates (accountsBalances) {
  return accountsBalances.reduce((acc, b) => {
    if (!acc.find(includedDate => isSameDay(includedDate, b.date))) {
      acc.push(b.date);
    }
    return acc;
  }, []);
}
