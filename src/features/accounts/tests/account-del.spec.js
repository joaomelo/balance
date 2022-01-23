import { chromium } from "playwright";
import { baseUrl, accountsByName } from "../../../../tests/fixtures";
import { goToBalancesMacro } from "../../balances/tests";
import { goToAccounts, callDelete } from "./macros";

describe("del account", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
    await goToAccounts(page);
  });

  afterEach(async () => {
    await page.close();
  });

  test("del account and respective balances", async () => {
    const { id, name } = accountsByName.house;
    await callDelete(page, id);

    const isAccountDeleted = await page.locator(name).isHidden();
    expect(isAccountDeleted).toBeTruthy();

    await goToBalancesMacro(page);
    const areBalancesDeleted = await page.locator(name).isHidden();
    expect(areBalancesDeleted).toBeTruthy();
  });
});
