import { chromium } from "playwright";
import { baseUrl, accountsByName } from "../../../../tests/fixtures";
import { goToBalancesMacro } from "../../balances/tests";
import { goToAccountsMacro } from "./macros";
import { listSelectors } from "./selectors";

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
  });

  afterEach(async () => {
    await page.close();
  });

  test("del account and respective balances", async () => {
    const { id, name } = accountsByName.house;

    await goToAccountsMacro(page);

    const nameCellText = await listSelectors.fieldById(page, id, "name");
    expect(nameCellText).toBe(name);

    await listSelectors.clickById(page, id, "delete");
    // const delButtonSelector = '[aria-label="delete"]';
    // await page.click(delButtonSelector);

    // const accountNameCell = await page.$(accountNameCellSelector);
    // expect(accountNameCell).toBeNull();

    // const accountNameCellSelector = '[role="cell"][data-field="name"]';
    // const accountNameCellText = await page.textContent(accountNameCellSelector);
    // expect(accountNameCellText).toBe(account);

    // await addBalanceMacro(page);

    // const balanceAccountNameSelector =
    //   '[role="cell"][data-field="accountName"]';
    // const balanceAccountNameText = await page.textContent(
    //   balanceAccountNameSelector
    // );
    // expect(balanceAccountNameText).toBe(account);

    // await goToBalancesMacro(page);
    // const balanceAccountNameCell = await page.$(balanceAccountNameSelector);
    // expect(balanceAccountNameCell).toBeNull();
  });
});
