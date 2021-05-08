import { EmailInvalidError, PasswordInvalidError } from '../body';
import { signInCase } from './sign-in';

describe('sign-in use case', () => {
  const createUser = ({ email }) => ({ id: 'id', email });
  const identityProvider = { signIn: jest.fn(credentials => createUser(credentials)) };

  test('happy path', async () => {
    const email = 'test@email.com';
    const credentials = { email, password: 'password' };

    await signInCase(credentials, { identityProvider });

    expect(identityProvider.signIn).toHaveBeenCalledWith(credentials);
  });

  test('throws if invalid email', async () => {
    const credentials = {
      email: 'test',
      password: 'password'
    };

    await expect(signInCase(credentials, { identityProvider }))
      .rejects
      .toThrow(EmailInvalidError);
  });

  test('throws if no email', async () => {
    const credentials = {
      password: 'password'
    };

    await expect(signInCase(credentials, { identityProvider }))
      .rejects
      .toThrow(EmailInvalidError);
  });

  test('throws if invalid password', async () => {
    const credentials = {
      email: 'test@email.com',
      password: 'bad'
    };

    await expect(signInCase(credentials, { identityProvider }))
      .rejects
      .toThrow(PasswordInvalidError);
  });

  test('throws if no password', async () => {
    const credentials = {
      email: 'test@email.com'
    };

    await expect(signInCase(credentials, { identityProvider }))
      .rejects
      .toThrow(PasswordInvalidError);
  });
});
