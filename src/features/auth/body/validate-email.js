import validator from 'email-validator';
import { AppError } from '../../../app/error';

export function validateEmail (email) {
  if (!validator.validate(email)) {
    throw new EmailInvalidError();
  }
}

export class EmailInvalidError extends AppError {
  constructor () {
    super({
      code: 'AUTH/EMAIL_INVALID',
      isOperational: true
    });
    Error.captureStackTrace(this, EmailInvalidError);
  }
}
