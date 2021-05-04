import { createCollectionStore, createUserFilter } from '../../../app/store';

export function createBalancesRepository (balancesRepository, identityService) {
  return createCollectionStore({
    repository: balancesRepository,
    filters: [createUserFilter(identityService)],
    identityService
  });
}
