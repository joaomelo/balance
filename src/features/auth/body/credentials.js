import { validateEmail } from './email';
import { validatePassword } from './password';

export function validateCredentials (credentials) {
  const { email, password } = credentials;
  validateEmail(email);
  validatePassword(password);
}
