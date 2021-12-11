import { groups, accounts, balances } from "../../../../tests/fixtures";
import { isSameDay } from "../../../libs/helpers";
import { consolidateGroupsBalances } from "./consolidate";

describe("groups balance consolidation", () => {
  test("produce one consolidation data object for every group", () => {
    const consolidatedGroups = consolidateGroupsBalances(
      groups,
      accounts,
      balances
    );
    expect(Object.values(consolidatedGroups)).toHaveLength(groups.length);
  });

  test("produce one group balance for every date with a relate account balance", () => {
    const consolidatedGroups = consolidateGroupsBalances(
      groups,
      accounts,
      balances
    );

    const liquidBalances = extractBalancesByName(
      "liquid",
      groups,
      consolidatedGroups
    );
    expect(liquidBalances).toHaveLength(6);

    const assetsBalances = extractBalancesByName(
      "assets",
      groups,
      consolidatedGroups
    );
    expect(assetsBalances).toHaveLength(1);

    const investmentsBalances = extractBalancesByName(
      "investments",
      groups,
      consolidatedGroups
    );
    expect(investmentsBalances).toHaveLength(0);
  });

  test("groups balances are consolidated accordingly", () => {
    const consolidated = consolidateGroupsBalances(groups, accounts, balances);

    const extractLiquid = (dateStr) =>
      extractBalance("liquid", dateStr, groups, consolidated);
    const balanceLiquids1130 = extractLiquid("2021-11-30");
    expect(balanceLiquids1130.amount).toBe(25);

    const balanceLiquids1120 = extractLiquid("2021-11-20");
    expect(balanceLiquids1120.amount).toBe(5);

    const balanceLiquids1110 = extractLiquid("2021-11-10");
    expect(balanceLiquids1110.amount).toBe(80);

    const balanceLiquids1108 = extractLiquid("2021-11-08");
    expect(balanceLiquids1108.amount).toBe(-10);

    const balanceLiquids1101 = extractLiquid("2021-11-01");
    expect(balanceLiquids1101.amount).toBe(-20);

    const balanceLiquids1001 = extractLiquid("2021-10-01");
    expect(balanceLiquids1001.amount).toBe(0);

    const balanceAssets1001 = extractBalance(
      "assets",
      "2021-10-01",
      groups,
      consolidated
    );
    expect(balanceAssets1001.amount).toBe(40000);
  });
});

function extractBalancesByName(name, groups, consolidatedGroups) {
  const group = groups.find((g) => g.name === name);
  return consolidatedGroups[group.id];
}

function extractBalance(name, dateStr, groups, consolidatedGroups) {
  const balances = extractBalancesByName(name, groups, consolidatedGroups);
  const date = new Date(dateStr);

  return balances.find((b) => isSameDay(b.date, date));
}
