import { chromium } from "playwright";
import { baseUrl, accountsByName } from "../../../../tests/fixtures";
import { goToAccounts, getContentOfId } from "./macros";

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
    await goToAccounts(page);
  });

  afterEach(async () => {
    await page.close();
  });

  test("last balances data appears empty in accounts without balances", async () => {
    const id = accountsByName.retirement.id;

    const dateCellText = await getContentOfId(page, id, "date");
    expect(dateCellText).toBe("");

    const amountCellText = await getContentOfId(page, id, "amount");
    expect(amountCellText).toBe("");
  });

  test("account with balances show date and amount of the last balances", async () => {
    const id = accountsByName.cc.id;

    const dateCellText = await getContentOfId(page, id, "date");
    expect(dateCellText).toEqual(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/));

    const amountCellText = await getContentOfId(page, id, "amount");
    expect(amountCellText).toEqual(expect.stringMatching(/^\$\d+\.\d{2}$/));
  });
});
