export function createDelGroup(dependencies) {
  const { groupsActions, accountsActions, accountsQuery } = dependencies;

  return async (payload) => {
    const { id } = payload;
    await groupsActions.del(id);

    const accounts = accountsQuery.current;
    const detachPromises = accounts
      .filter(({ groupId }) => groupId === id)
      .map(({ groupId, ...accountData }) => accountsActions.set(accountData));

    await Promise.all(detachPromises);
  };
}
