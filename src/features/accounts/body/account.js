import { AppError } from '../../../app/error';

export function validateAccount (account, accounts) {
  const { id, name } = account;

  if (typeof name !== 'string' || name.length < 3 || name.length > 64) {
    throw new NameInvalidError();
  }

  const names = accounts
    .filter(a => a.id !== id)
    .map(({ name }) => name);

  if (names.includes(name)) {
    throw new NameNonUniqueError();
  }
}

export class NameInvalidError extends AppError {
  constructor () {
    super({
      code: 'ACCOUNTS/NAME_INVALID',
      isOperational: true
    });
    Error.captureStackTrace(this, NameInvalidError);
  }
}

export class NameNonUniqueError extends AppError {
  constructor () {
    super({
      code: 'ACCOUNTS/NON_UNIQUE_NAME',
      isOperational: true
    });
    Error.captureStackTrace(this, NameNonUniqueError);
  }
}
