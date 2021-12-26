import { EmailInvalidError, PasswordInvalidError } from "../body";
import { signInCommand } from "./sign-in";

describe("sign-in command", () => {
  const identityService = { signIn: jest.fn() };

  test("happy path", async () => {
    const email = "test@email.com";
    const credentials = { email, password: "password" };

    await signInCommand({ identityService }, credentials);

    expect(identityService.signIn).toHaveBeenCalledWith(credentials);
  });

  test("throws if invalid email", async () => {
    const credentials = {
      email: "test",
      password: "password",
    };

    await expect(
      signInCommand({ identityService }, credentials)
    ).rejects.toThrow(EmailInvalidError);
  });

  test("throws if no email", async () => {
    const credentials = {
      password: "password",
    };

    await expect(
      signInCommand({ identityService }, credentials)
    ).rejects.toThrow(EmailInvalidError);
  });

  test("throws if invalid password", async () => {
    const credentials = {
      email: "test@email.com",
      password: "bad",
    };

    await expect(
      signInCommand({ identityService }, credentials)
    ).rejects.toThrow(PasswordInvalidError);
  });

  test("throws if no password", async () => {
    const credentials = {
      email: "test@email.com",
    };

    await expect(
      signInCommand({ identityService }, credentials)
    ).rejects.toThrow(PasswordInvalidError);
  });
});
