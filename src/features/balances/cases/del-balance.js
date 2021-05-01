export async function delBalanceCase ({ id }, dependencies) {
  const { balancesRepository } = dependencies;
  await balancesRepository.del(id);
}
