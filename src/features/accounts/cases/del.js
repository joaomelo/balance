export async function delAccountCase ({ id }, dependencies) {
  const { accountsRepository } = dependencies;

  await accountsRepository.del(id);
}
