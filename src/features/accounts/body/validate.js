import { AppError } from "../../../libs/errors";

export function validateAccount(accountData, context) {
  const { accounts } = context;
  const { id, name } = accountData;

  if (typeof name !== "string" || name.length < 2 || name.length > 64) {
    throw new NameInvalidError();
  }

  const names = accounts.filter((a) => a.id !== id).map(({ name }) => name);

  if (names.includes(name)) {
    throw new NameNonUniqueError();
  }
}

export class NameInvalidError extends AppError {
  constructor() {
    super({
      code: "ACCOUNTS/NAME_INVALID",
      isOperational: true,
    });
    Error.captureStackTrace(this, NameInvalidError);
  }
}

export class NameNonUniqueError extends AppError {
  constructor() {
    super({
      code: "ACCOUNTS/NON_UNIQUE_NAME",
      isOperational: true,
    });
    Error.captureStackTrace(this, NameNonUniqueError);
  }
}
