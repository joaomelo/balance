import { createUuid } from '../../../app/ids';

export function addBalanceCase (balanceData, dependencies) {
  const { balancesRepository, authStore } = dependencies;

  const balance = {
    id: createUuid(),
    user: authStore.getters.userId,
    ...balanceData
  };

  return balancesRepository.add(balance);
}
