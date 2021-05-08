import { EmailInvalidError, PasswordInvalidError } from '../body';
import { signInCase } from './sign-in';

describe('sign-in use case', () => {
  const createUser = ({ email }) => ({ id: 'id', email });
  const authService = { signIn: jest.fn(credentials => createUser(credentials)) };

  test('happy path', async () => {
    const email = 'test@email.com';
    const credentials = { email, password: 'password' };

    await signInCase(authService, credentials);

    expect(authService.signIn).toHaveBeenCalledWith(credentials);
  });

  test('throws if invalid email', async () => {
    const credentials = {
      email: 'test',
      password: 'password'
    };

    await expect(signInCase(authService, credentials))
      .rejects
      .toThrow(EmailInvalidError);
  });

  test('throws if no email', async () => {
    const credentials = {
      password: 'password'
    };

    await expect(signInCase(authService, credentials))
      .rejects
      .toThrow(EmailInvalidError);
  });

  test('throws if invalid password', async () => {
    const credentials = {
      email: 'test@email.com',
      password: 'bad'
    };

    await expect(signInCase(authService, credentials))
      .rejects
      .toThrow(PasswordInvalidError);
  });

  test('throws if no password', async () => {
    const credentials = {
      email: 'test@email.com'
    };

    await expect(signInCase(authService, credentials))
      .rejects
      .toThrow(PasswordInvalidError);
  });
});
