import { validateCredentials } from '../body';

export async function signInCommand (dependencies, credentials) {
  const { identityCommands } = dependencies;

  validateCredentials(credentials);
  await identityCommands.signIn(credentials);
}
