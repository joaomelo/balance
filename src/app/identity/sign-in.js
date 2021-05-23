import { CredentialsUnrecognizedError } from './errors';

export function createSignIn (fireauth) {
  return credentials => signIn(fireauth, credentials);
}

async function signIn (fireauth, credentials) {
  try {
    const { email, password } = credentials;
    await fireauth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        throw new CredentialsUnrecognizedError();
      default:
        throw error;
    }
  }
}
