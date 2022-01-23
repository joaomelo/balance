import { chromium } from "playwright";
import { baseUrl, accountsByName } from "../../../../tests/fixtures";
import { goToAccounts, editAccount, getContentOfId } from "./macros";

describe("edit account", () => {
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

  test("edit account name", async () => {
    const { id } = accountsByName.house;
    const newName = "i'm a new name";

    await editAccount(page, id, { name: newName });

    const nameCellText = await getContentOfId(page, id, "name");
    expect(nameCellText).toBe(newName);
  });
});
