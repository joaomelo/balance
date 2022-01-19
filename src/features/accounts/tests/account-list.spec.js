import { chromium } from "playwright";
import { baseUrl, accountsByName } from "../../../../tests/fixtures";
import { goToAccountsMacro } from "./macros";
import { accountsSelectors } from "./selectors";

describe("list accounts", () => {
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

  test("last balances data appears empty in accounts without balances", async () => {
    await goToAccountsMacro(page);

    const id = accountsByName.retirement.id;

    const dateCellText = await accountsSelectors.list.date(page, id);
    expect(dateCellText).toBe("");

    const amountCellText = await accountsSelectors.list.amount(page, id);
    expect(amountCellText).toBe("");
  });

  test("account with balances show date and amount of the last balances", async () => {
    await goToAccountsMacro(page);

    const id = accountsByName.cc.id;

    const dateCellText = await accountsSelectors.list.date(page, id);
    expect(dateCellText).toEqual(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/));

    const amountCellText = await accountsSelectors.list.amount(page, id);
    expect(amountCellText).toEqual(expect.stringMatching(/^\$\d+\.\d{2}$/));
  });
});
