import { AppError } from '../../../app/error';

export function validatePassword (password) {
  if (typeof password !== 'string' || password.length < 8 || password.length > 64) {
    throw new PasswordInvalidError();
  }
}

export class PasswordInvalidError extends AppError {
  constructor () {
    super({
      code: 'AUTH/PASSWORD_INVALID',
      isOperational: true
    });
    Error.captureStackTrace(this, PasswordInvalidError);
  }
}
