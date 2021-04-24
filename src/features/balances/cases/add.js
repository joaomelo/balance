import { createUuid } from '../../../app/ids';

export function addCase (balanceData, dependencies) {
  const { balancesRepository, authStore } = dependencies;

  const balance = {
    id: createUuid(),
    creator: authStore.getters.userId,
    ...balanceData
  };

  return balancesRepository.add(balance);
}
