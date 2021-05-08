export function createUserFilter (userId) {
  return () => {
    return {
      field: 'user',
      operator: '==',
      value: userId
    };
  };
}
