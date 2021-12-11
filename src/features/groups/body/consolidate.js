import { isSameDay } from "../../../libs/helpers";

export function consolidateGroupsBalances(groups, accounts, balances) {
  return groups.reduce((acc, group) => {
    acc[group.id] = consolidateGroupBalances(group, accounts, balances);
    return acc;
  }, {});
}

function consolidateGroupBalances(group, accounts, balances) {
  const rawBalances = extractGroupBalances(group, accounts, balances);
  return consolidateBalances(rawBalances);
}

function extractGroupBalances(group, accounts, balances) {
  const accountsIds = accounts
    .filter((a) => a.groupId === group.id)
    .map(({ id }) => id);

  return balances.filter((b) => accountsIds.includes(b.accountId));
}

function consolidateBalances(balances) {
  const uniqueAccountsIds = distinguishAccountsIds(balances);
  const uniqueDates = distinguishDates(balances);

  return uniqueDates.reduce((acc, date) => {
    const amount = uniqueAccountsIds.reduce((acc, accountId) => {
      const balance = findMatchingBalance(accountId, date, balances);
      return balance ? acc + balance.amount : acc;
    }, 0);

    acc.push({ date, amount });
    return acc;
  }, []);
}

function findMatchingBalance(accountId, date, balances) {
  const candidateBalances = balances.filter(
    (b) => b.accountId === accountId && b.date <= date
  );

  if (candidateBalances.length === 0) return null;

  return candidateBalances.reduce((acc, b) => (acc.date > b.date ? acc : b));
}

function distinguishAccountsIds(balances) {
  const accountsSet = new Set(balances.map((b) => b.accountId));
  return Array.from(accountsSet);
}

function distinguishDates(balances) {
  return balances.reduce((acc, b) => {
    if (!acc.find((includedDate) => isSameDay(includedDate, b.date))) {
      acc.push(b.date);
    }
    return acc;
  }, []);
}
