export async function delGroupCommand (dependencies, payload) {
  const {
    groupsMutations
    // balancesMutations,
    // activeBalancesSelector
  } = dependencies;

  const { id } = payload;
  await groupsMutations.del(id);

  // const balancesIds = activeBalancesSelector
  //   .current
  //   .filter(b => b.groupId === id)
  //   .map(b => b.id);

  // if (balancesIds.length > 0) {
  //   await balancesMutations.del(balancesIds);
  // }
}
