import { chromium } from "playwright";
import { signInMacro } from "../../auth/tests";
import { goToAccounts, addAccount } from "../../accounts/tests";
import { addGroupMacro, goToGroupsMacro } from "./macros";

describe("del group", () => {
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

  test("del group and dissociate from respective account", async () => {
    await signInMacro(page);

    const group = "assets";
    await addGroupMacro(page, group);

    const groupNameCellSelector = '[role="cell"][data-field="name"]';
    const groupNameCellText = await page.textContent(groupNameCellSelector);
    expect(groupNameCellText).toBe(group);

    const account = "car";
    await addAccount(page, { group, account });

    const groupCellSelector = '[role="cell"][data-field="groupName"]';
    const groupFilledCellText = await page.textContent(groupCellSelector);
    expect(groupFilledCellText).toBe(group);

    await goToGroupsMacro(page);
    const delButtonSelector = '[aria-label="delete"]';
    await page.click(delButtonSelector);

    const groupNameCell = await page.$(groupNameCellSelector);
    expect(groupNameCell).toBeNull();

    await goToAccounts(page);
    const groupEmptyCellText = await page.textContent(groupCellSelector);
    expect(groupEmptyCellText).toBe("");
  });
});
