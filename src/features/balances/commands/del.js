export async function delBalanceCommand (dependencies, payload) {
  const {
    balancesMutations
  } = dependencies;
  const { id } = payload;
  await balancesMutations.del(id);
}
