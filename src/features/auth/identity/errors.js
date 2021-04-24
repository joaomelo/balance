import { AppError } from '../../../app/error';

export class EmailAlreadyInUseError extends AppError {
  constructor () {
    super({
      code: 'AUTH/EMAIL_ALREADY_IN_USE',
      isOperational: true
    });
    Error.captureStackTrace(this, EmailAlreadyInUseError);
  }
}

export class CredentialsUnrecognizedError extends AppError {
  constructor () {
    super({
      code: 'AUTH/CREDENTIALS_UNRECOGNIZED',
      isOperational: true
    });
    Error.captureStackTrace(this, CredentialsUnrecognizedError);
  }
}
