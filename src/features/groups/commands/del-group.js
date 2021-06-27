export async function delGroupCommand (dependencies, payload) {
  const {
    groupsMutations,
    accountsMutations,
    activeAccountsSelector
  } = dependencies;

  const { id } = payload;
  await groupsMutations.del(id);

  const detachPromises = activeAccountsSelector
    .current
    .filter(({ groupId }) => groupId === id)
    .map(({ groupId, ...accountData }) => accountsMutations.set(accountData));

  await Promise.all(detachPromises);
}
