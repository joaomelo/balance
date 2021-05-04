import { createCollectionStore, createUserFilter } from '../../../app/store';

export function createAccountsRepository (accountsRepository, identityService) {
  return createCollectionStore({
    repository: accountsRepository,
    filters: [createUserFilter(identityService)],
    identityService
  });
}
