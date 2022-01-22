import { chromium } from "playwright";
import { baseUrl, accounts, groups } from "../../../../tests/fixtures";
import { goToAccountsMacro, addAccountMacro } from "./macros";
import { listSelectors } from "./selectors";

describe("add account", () => {
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
    await goToAccountsMacro(page);
  });

  afterEach(async () => {
    await page.close();
  });

  test("add account to repository with correct data shape", async () => {
    const group = groups[0].name;
    const name = "new account";
    await addAccountMacro(page, { name, group });

    const id = await listSelectors.idByContent(page, name);

    const nameCellText = await listSelectors.fieldById(page, id, "name");
    expect(nameCellText).toBe(name);

    const groupCellText = await listSelectors.fieldById(page, id, "groupName");
    expect(groupCellText).toBe(group);
  });

  test("show error if empty account name", async () => {
    await addAccountMacro(page);

    const error = await page.$("text=valid name is required");
    expect(error).toBeTruthy();
  });

  test("show error if another account with the same name already exists", async () => {
    const name = accounts[0].name;

    await addAccountMacro(page, { name });

    const error = await page.$("text=name is already in use");
    expect(error).toBeTruthy();
  });
});
