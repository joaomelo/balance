import { chromium } from "playwright";
import { baseUrl, accounts, groups } from "../../../../tests/fixtures";
import {
  goToAccounts,
  addAccount,
  getIdOfContent,
  getContentOfId,
} from "./macros";

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
    await goToAccounts(page);
  });

  afterEach(async () => {
    await page.close();
  });

  test("add account to repository with correct data shape", async () => {
    const group = groups[0].name;
    const name = "new account";
    await addAccount(page, { name, group });

    const id = await getIdOfContent(page, name);

    const nameCellText = await getContentOfId(page, id, "name");
    expect(nameCellText).toBe(name);

    const groupCellText = await getContentOfId(page, id, "groupName");
    expect(groupCellText).toBe(group);
  });

  test("show error if empty account name", async () => {
    await addAccount(page);

    const error = await page.$("text=valid name is required");
    expect(error).toBeTruthy();
  });

  test("show error if another account with the same name already exists", async () => {
    const name = accounts[0].name;

    await addAccount(page, { name });

    const error = await page.$("text=name is already in use");
    expect(error).toBeTruthy();
  });
});
