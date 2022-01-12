export async function createDelBalance(dependencies) {
  const { balancesActions } = dependencies;

  return async (payload) => {
    const { id } = payload;
    await balancesActions.del(id);
  };
}
