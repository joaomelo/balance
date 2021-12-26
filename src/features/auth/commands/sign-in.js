import { validateCredentials } from "../body";

export async function signInCommand(dependencies, credentials) {
  const { identityService } = dependencies;

  validateCredentials(credentials);
  await identityService.signIn(credentials);
}
