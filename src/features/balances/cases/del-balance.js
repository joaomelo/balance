export async function delBalanceCase ({ id }, dependencies) {
  const { balancesService } = dependencies;
  await balancesService.del(id);
}
