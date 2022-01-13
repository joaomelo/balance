import { createUuid } from "../../../libs/helpers";
import { validateBalance } from "../body";

export function createSetBalance(dependencies) {
  const { balancesActions, accountsQuery, balancesQuery, userIdStream } =
    dependencies;

  return async (payload) => {
    const newBalancesData = Array.isArray(payload) ? payload : [payload];
    const newBalances = newBalancesData.map((balanceData) => {
      validateBalance(balanceData, {
        accounts: accountsQuery.current,
        balances: balancesQuery.current,
      });

      return {
        id: createUuid(),
        user: userIdStream.current,
        ...balanceData,
      };
    });

    await balancesActions.set(newBalances);
  };
}
