export function createSignOut(dependencies) {
  const { authDriver } = dependencies;

  return async () => {
    await authDriver.signOut();
  };
}
