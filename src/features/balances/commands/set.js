import { createUuid } from "../../../libs/helpers";
import { validateBalance } from "../body";

export function createSetBalance(dependencies) {
  const { balancesActions, accountsQuery, balancesQuery, userIdStream } =
    dependencies;

  return async (payload) => {
    validateBalance(payload, {
      accounts: accountsQuery.current,
      balances: balancesQuery.current,
    });

    const balance = {
      id: createUuid(),
      user: userIdStream.current,
      ...payload,
    };

    await balancesActions.set(balance);
  };
}
