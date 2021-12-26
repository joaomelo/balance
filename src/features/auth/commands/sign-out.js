export async function signOutCommand(dependencies) {
  const { identityService } = dependencies;
  await identityService.signOut();
}
