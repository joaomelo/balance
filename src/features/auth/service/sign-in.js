import { validateCredentials } from '../body';

export async function signInCase ({ signIn }, credentials) {
  validateCredentials(credentials);
  await signIn(credentials);
}
