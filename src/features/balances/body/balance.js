import { isSameDate } from '../../../app/helpers';
import { AppError } from '../../../app/error';

export function validateBalance (balance, balances, accounts) {
  const { id, amount, date, accountId } = balance;

  if (!date) {
    throw new DateRequiredError();
  }

  if (amount !== 0 && !amount) {
    throw new AmountRequiredError();
  }

  if (!accounts.find(({ id }) => id === accountId)) {
    throw new AccountInvalidError();
  }

  const collidingDate = b => {
    // console.log({
    //   b,
    //   isDate: isSameDate(b.date, date),
    //   is: b.id !== id &&
    //   b.accountId === accountId &&
    //   isSameDate(b.date, date)
    // });

    return b.id !== id &&
    b.accountId === accountId &&
    isSameDate(b.date, date);
  };

  // console.log({ balance, balances });

  if (balances.find(collidingDate)) {
    throw new DateCollidingError();
  }
}

export class DateRequiredError extends AppError {
  constructor () {
    super({
      code: 'BALANCES/DATE_REQUIRED',
      isOperational: true
    });
    Error.captureStackTrace(this, DateRequiredError);
  }
}

export class AmountRequiredError extends AppError {
  constructor () {
    super({
      code: 'BALANCES/AMOUNT_REQUIRED',
      isOperational: true
    });
    Error.captureStackTrace(this, AmountRequiredError);
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

export class DateCollidingError extends AppError {
  constructor () {
    super({
      code: 'BALANCES/DATE_COLLIDING',
      isOperational: true
    });
    Error.captureStackTrace(this, DateCollidingError);
  }
}
