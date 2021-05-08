import { createUserFilter } from './user-filter';

export function syncRepositoryWithAuth (identityService, repositoryService, filters = []) {
  identityService.subscribe(({ isSignedIn, userId }) => {
    if (isSignedIn()) {
      const userFilter = createUserFilter(userId());
      repositoryService.igniteQuery([...filters, userFilter]);
    } else {
      repositoryService.douseQuery();
    }
  });
}
