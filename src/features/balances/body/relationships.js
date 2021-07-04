export function projectBalancesWithRelationships (
  balances,
  accounts
) {
  return balances.map(balance => {
    const account = accounts.find(a =>
      a.id === balance.accountId
    );
    return {
      ...balance,
      accountName: account?.name || null
    };
  });
};
