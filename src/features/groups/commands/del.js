export async function delGroupCommand (dependencies, payload) {
  const {
    groupsMutations,
    accountsMutations,
    accounts
  } = dependencies;

  const { id } = payload;
  await groupsMutations.del(id);

  const detachPromises = accounts
    .filter(({ groupId }) => groupId === id)
    .map(({ groupId, ...accountData }) => accountsMutations.set(accountData));

  await Promise.all(detachPromises);
}
