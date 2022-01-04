export async function delGroupCommand(dependencies, payload) {
  const { groupsMutations, accountsActions, accounts } = dependencies;

  const { id } = payload;
  await groupsMutations.del(id);

  const detachPromises = accounts
    .filter(({ groupId }) => groupId === id)
    .map(({ groupId, ...accountData }) => accountsActions.set(accountData));

  await Promise.all(detachPromises);
}
