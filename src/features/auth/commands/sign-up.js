import { validateCredentials } from "../body";

export function createSignUp(dependencies) {
  const { authDriver } = dependencies;

  return async (payload) => {
    validateCredentials(payload);

    const { email, password } = payload;
    await authDriver.createUserWithEmailAndPassword(email, password);
  };
}
