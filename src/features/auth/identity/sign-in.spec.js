import { credentials } from '../../../../tests/fixtures';
import { initFirebaseSuiteFromEnv } from '../../../app/firebase';
import { CredentialsUnrecognizedError } from './errors';
import { createIdentityProvider } from './factory';

describe('createIdentityProvider factory function', () => {
  let identityProvider;
  const config = {
    ...initFirebaseSuiteFromEnv(),
    authEmulatorHost: process.env.FIREAUTH_EMULATOR_HOST
  };

  beforeAll(async () => {
    identityProvider = await createIdentityProvider(config);
  });

  test('signs in a existing user with proper credentials', async () => {
    const user = await identityProvider.signIn(credentials[0]);

    expect(user).toEqual(expect.objectContaining({
      id: expect.any(String),
      email: credentials[0].email
    }));
  });

  test('throws if user does not exist', async () => {
    const badCredentials = {
      email: 'i@do.not.exist',
      password: 'password'
    };

    await expect(identityProvider.signIn(badCredentials))
      .rejects
      .toThrow(CredentialsUnrecognizedError);
  });

  test('throws if wrong password', async () => {
    const badCredentials = {
      email: credentials[0].email,
      password: 'iAmNotAPassword'
    };

    await expect(identityProvider.signIn(badCredentials))
      .rejects
      .toThrow(CredentialsUnrecognizedError);
  });
});
