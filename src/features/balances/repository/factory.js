export function createBalancesRepository (repositoryProvider) {
  const balancesRepository = repositoryProvider.repository('balances');
  return balancesRepository;
}
