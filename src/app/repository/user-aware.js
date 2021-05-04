export function connectRepositoryService (repositoryService, config) {
  const { filters, identityService } = config;
  let unsubscribe = () => null;
  identityService.subscribe(({ selectors }) => {
    unsubscribe();
    if (selectors.isSignedIn()) {
      unsubscribe = repository.subscribe(filters, items => {
        state.items = items.reduce((acc, item) => {
          acc[item.id] = { ...item };
          return acc;
        }, {});
        baseStore.invalidate();
      });
    } else {
      unsubscribe = () => null;
      state.items = [];
      baseStore.invalidate();
    }
  });

  return baseStore;
}

export function createUserFilter (identityService) {
  return () => {
    const userId = identityService.getters.userId;
    return {
      field: 'user',
      operator: '==',
      value: userId
    };
  };
}
