import { createUuid } from "../../../libs/helpers";
import { validateAccount } from "../body";

export function createSetAccount(dependencies) {
  const { accountsActions, accountsQuery, userIdStream } = dependencies;

  return async (payload) => {
    const newAccountsData = Array.isArray(payload) ? payload : [payload];
    const newAccounts = newAccountsData.map((accountData) => {
      validateAccount(accountData, { accounts: accountsQuery.current });
      return {
        id: createUuid(),
        user: userIdStream.current,
        ...accountData,
      };
    });

    await accountsActions.set(newAccounts);
  };
}
