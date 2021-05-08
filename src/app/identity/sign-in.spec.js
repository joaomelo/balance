import { credentials } from '../../../tests/fixtures';
import { initFirebaseSuiteFromEnv } from '../firebase';
import { CredentialsUnrecognizedError } from './errors';
import { createIdentityService } from './factory';

describe('createIdentityService factory function', () => {
  let identityService;

  beforeAll(async () => {
    const { fireauth } = await initFirebaseSuiteFromEnv();
    identityService = createIdentityService(fireauth);
  });

  test('signs in a existing user with proper credentials', async () => {
    const user = await identityService.signIn(credentials[0]);

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

    await expect(identityService.signIn(badCredentials))
      .rejects
      .toThrow(CredentialsUnrecognizedError);
  });

  test('throws if wrong password', async () => {
    const badCredentials = {
      email: credentials[0].email,
      password: 'iAmNotAPassword'
    };

    await expect(identityService.signIn(badCredentials))
      .rejects
      .toThrow(CredentialsUnrecognizedError);
  });
});
