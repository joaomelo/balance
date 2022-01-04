import { createUuid } from "../../../libs/helpers";
import { validateBalance } from "../body";

export async function setBalanceCommand(dependencies, payload) {
  const { balancesActions, accounts, balances, userId } = dependencies;

  validateBalance(
    {
      accounts,
      balances,
    },
    payload
  );

  const balance = {
    id: createUuid(),
    user: userId,
    ...payload,
  };

  await balancesActions.set(balance);
}
