import { EmailInvalidError, PasswordInvalidError } from "../body";
import { signInCommand, createSignIn } from "./sign-in";
import { credentials } from "../../../tests/fixtures";
import { initFirebaseSuiteFromEnv } from "../firebase";
import { CredentialsUnrecognizedError } from "./errors";

describe("sign-in command", () => {
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

  test("throws if invalid email", async () => {
    const credentials = {
      email: "test",
      password: "password",
    };

    await expect(signInCommand({ authDriver }, credentials)).rejects.toThrow(
      EmailInvalidError
    );
  });

  test("throws if no email", async () => {
    const credentials = {
      password: "password",
    };

    await expect(signInCommand({ authDriver }, credentials)).rejects.toThrow(
      EmailInvalidError
    );
  });

  test("throws if invalid password", async () => {
    const credentials = {
      email: "test@email.com",
      password: "bad",
    };

    await expect(signInCommand({ authDriver }, credentials)).rejects.toThrow(
      PasswordInvalidError
    );
  });

  test("throws if no password", async () => {
    const credentials = {
      email: "test@email.com",
    };

    await expect(signInCommand({ authDriver }, credentials)).rejects.toThrow(
      PasswordInvalidError
    );
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
});
