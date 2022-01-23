import { chromium } from "playwright";
import { signInMacro } from "../../auth/tests";
import { addAccount } from "../../accounts/tests";
import { addBalanceMacro } from "./macros";

describe("edit balance", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  test("edit balance amount and date", async () => {
    await signInMacro(page);

    const account = "savings";
    await addAccount(page, { account });
    await addBalanceMacro(page);

    const editButtonSelector = '[aria-label="edit"]';
    // hack for playwright proper click in edit
    await page.dispatchEvent(editButtonSelector, "click");

    const newDate = "2021-01-01";
    const newAmount = "100";
    await page.fill("#inputDate", newDate);
    // hack to avoid playwright flakiness regarding numeric input data
    await page.fill("#inputAmount", "");
    await page.fill("#inputAmount", newAmount);

    await page.click("#buttonSave");

    const dateCellSelector = '[role="cell"][data-field="date"]';
    const dateCellText = await page.textContent(dateCellSelector);
    expect(dateCellText).toBe(newDate);

    const amountCellSelector = '[role="cell"][data-field="amount"]';
    const amountCellText = await page.textContent(amountCellSelector);
    expect(amountCellText).toMatch(newAmount);
  });
});
