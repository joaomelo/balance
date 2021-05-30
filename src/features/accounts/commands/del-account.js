export async function delAccountCommand (dependencies, payload) {
  const {
    accountsMutations,
    balancesMutations,
    activeBalancesSelector
  } = dependencies;

  const { id } = payload;
  await accountsMutations.del(id);

  const balancesIds = activeBalancesSelector
    .current
    .filter(b => b.accountId === id);
  if (balancesIds.length > 0) {
    await balancesMutations.del(balancesIds);
  }
}
