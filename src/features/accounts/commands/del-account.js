export async function delAccountCommand (dependencies, payload) {
  const {
    accountsMutations,
    balancesMutations,
    balances
  } = dependencies;

  const { id } = payload;
  await accountsMutations.del(id);

  const balancesIds = balances
    .filter(b => b.accountId === id)
    .map(b => b.id);

  if (balancesIds.length > 0) {
    await balancesMutations.del(balancesIds);
  }
}
