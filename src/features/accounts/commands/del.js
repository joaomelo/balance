export function createDelAccount(dependencies) {
  const { accountsActions, balancesActions, balancesQuery } = dependencies;

  return async (payload) => {
    const { id } = payload;
    await accountsActions.del(id);

    const balancesIds = balancesQuery.current
      .filter((b) => b.accountId === id)
      .map((b) => b.id);

    if (balancesIds.length > 0) {
      await balancesActions.del(balancesIds);
    }
  };
}
