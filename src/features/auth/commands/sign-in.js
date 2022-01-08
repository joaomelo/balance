import { validateCredentials } from "../body";
import { CredentialsUnrecognizedError } from "./errors";

export function createSignIn(dependencies) {
  const { authDriver } = dependencies;

  return async (payload) => {
    validateCredentials(payload);

    try {
      const { email, password } = payload;
      await authDriver.signInWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          throw new CredentialsUnrecognizedError();
        default:
          throw error;
      }
    }
  };
}
