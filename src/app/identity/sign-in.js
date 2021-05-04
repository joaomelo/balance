import { CredentialsUnrecognizedError } from './errors';
import { extractUser } from './extract-user';

export async function signIn (credentials, fireauth) {
  try {
    const { email, password } = credentials;
    const userCredential = await fireauth.signInWithEmailAndPassword(email, password);
    return extractUser(userCredential.user);
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
