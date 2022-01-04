export async function delBalanceCommand(dependencies, payload) {
  const { balancesActions } = dependencies;
  const { id } = payload;
  await balancesActions.del(id);
}
