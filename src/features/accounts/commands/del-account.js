export async function delAccountCommand (dependencies, payload) {
  const {
    accountsMutations,
    balancesMutations,
    activeBalancesSelector
  } = dependencies;

  const { id } = payload;
  const balancesIds = activeBalancesSelector
    .current
    .filter(b => b.accountId === id);

  await accountsMutations.del(id);
  await balancesMutations.del(balancesIds);
}
