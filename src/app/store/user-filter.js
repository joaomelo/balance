export function createUserFilter (authStore) {
  return () => {
    const userId = authStore.getters.userId;
    return {
      field: 'user',
      operator: '==',
      value: userId
    };
  };
}
