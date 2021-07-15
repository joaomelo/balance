import { isSameDay } from '../../../libs/helpers';
import { AppError } from '../../../libs/errors';

export function validateBalance (context, balanceData) {
  const { accounts, balances } = context;
  const { id, amount, date, accountId } = balanceData;

  if (!(date instanceof Date)) {
    throw new DateInvalidError();
  }

  if (typeof amount !== 'number') {
    throw new AmountInvalidError();
  }

  if (!accounts.find(({ id }) => id === accountId)) {
    throw new AccountInvalidError();
  }

  const collidingDate = b => {
    return b.id !== id &&
    b.accountId === accountId &&
    isSameDay(b.date, date);
  };

  if (balances.find(collidingDate)) {
    throw new DateCollidingError();
  }
}

export class AccountInvalidError extends AppError {
  constructor () {
    super({
      code: 'BALANCES/ACCOUNT_INVALID',
      isOperational: true
    });
    Error.captureStackTrace(this, AccountInvalidError);
  }
}

export class DateInvalidError extends AppError {
  constructor () {
    super({
      code: 'BALANCES/DATE_INVALID',
      isOperational: true
    });
    Error.captureStackTrace(this, DateInvalidError);
  }
}

export class DateCollidingError extends AppError {
  constructor () {
    super({
      code: 'BALANCES/DATE_COLLIDING',
      isOperational: true
    });
    Error.captureStackTrace(this, DateCollidingError);
  }
}

export class AmountInvalidError extends AppError {
  constructor () {
    super({
      code: 'BALANCES/AMOUNT_INVALID',
      isOperational: true
    });
    Error.captureStackTrace(this, AmountInvalidError);
  }
}
