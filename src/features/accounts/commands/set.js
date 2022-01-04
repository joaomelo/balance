import { createUuid } from "../../../libs/helpers";
import { validateAccount } from "../body";

export function createSetAccount(dependencies) {
  const { accountsActions, accountsQuery, userIdStream } = dependencies;

  return async (payload) => {
    const accounts = accountsQuery.current;
    validateAccount(payload, { accounts });

    const account = {
      id: createUuid(),
      user: userIdStream.current,
      ...payload,
    };

    await accountsActions.set(account);
  };
}
