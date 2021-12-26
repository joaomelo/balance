import { CredentialsUnrecognizedError } from "./errors";

export async function signIn(fireauth, credentials) {
  try {
    const { email, password } = credentials;
    await fireauth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        throw new CredentialsUnrecognizedError();
      default:
        throw error;
    }
  }
}
