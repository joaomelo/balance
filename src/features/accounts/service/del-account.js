export async function delAccountCase (accountsService, balancesService, id) {
  const accountBalancesIds = balancesService
    .accountBalances(id)
    .map(b => b.id);

  await accountsService.del(id);
  await balancesService.delBalancesCase(accountBalancesIds);
}
