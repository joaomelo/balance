import { validateEmail } from './validate-email';
import { validatePassword } from './validate-password';

export function validateCredentials (credentials) {
  const { email, password } = credentials;
  validateEmail(email);
  validatePassword(password);
}
