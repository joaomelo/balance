export async function signOutCommand (dependencies) {
  const { identityMutations } = dependencies;
  await identityMutations.signOut();
}
