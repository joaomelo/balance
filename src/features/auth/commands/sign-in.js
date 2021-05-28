import { validateCredentials } from '../body';

export async function signInCommand (dependencies, credentials) {
  const { identityMutations } = dependencies;

  validateCredentials(credentials);
  await identityMutations.signIn(credentials);
}
