import { AppError } from '../../app/errors';

export class EmailAlreadyInUseError extends AppError {
  constructor () {
    super({
      code: 'IDENTITY/EMAIL_ALREADY_IN_USE',
      isOperational: true
    });
    Error.captureStackTrace(this, EmailAlreadyInUseError);
  }
}

export class CredentialsUnrecognizedError extends AppError {
  constructor () {
    super({
      code: 'IDENTITY/CREDENTIALS_UNRECOGNIZED',
      isOperational: true
    });
    Error.captureStackTrace(this, CredentialsUnrecognizedError);
  }
}
