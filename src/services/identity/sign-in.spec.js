import { credentials } from "../../../tests/fixtures";
import { initFirebaseSuiteFromEnv } from "../firebase";
import { CredentialsUnrecognizedError } from "./errors";
import { createSignIn } from "./sign-in";

describe("createIdentityService factory function", () => {
  let app, signIn;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    signIn = createSignIn(suite.fireauth);
  });

  afterAll(() => app.delete());

  test("signs in a existing user with proper credentials", async () => {
    await expect(signIn(credentials[0])).resolves.not.toThrow();
  });

  test("throws if user does not exist", async () => {
    const badCredentials = {
      email: "i@do.not.exist",
      password: "password",
    };

    await expect(signIn(badCredentials)).rejects.toThrow(
      CredentialsUnrecognizedError
    );
  });

  test("throws if wrong password", async () => {
    const badCredentials = {
      email: credentials[0].email,
      password: "iAmNotAPassword",
    };

    await expect(signIn(badCredentials)).rejects.toThrow(
      CredentialsUnrecognizedError
    );
  });
});
