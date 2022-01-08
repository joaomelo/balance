import { validateCredentials } from "../body";

export function createCreateUser(dependencies) {
  const { authDriver } = dependencies;

  return async (payload) => {
    validateCredentials(payload);

    const { email, password } = payload;
    await authDriver.createUserWithEmailAndPassword(email, password);
    await authDriver.signOut();
  };
}
