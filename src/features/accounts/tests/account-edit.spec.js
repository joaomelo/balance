import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addAccountMacro } from './macros';

describe('edit account', () => {
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

  test('edit account name', async () => {
    await signInMacro(page);

    const account = 'savings';
    await addAccountMacro(page, { account });

    const editButtonSelector = '[aria-label="edit"]';
    await page.click(editButtonSelector);

    const newName = 'credit card';
    await page.fill('#inputName', newName);
    await page.click('#buttonSave');

    const nameCellSelector = '[role="cell"][data-field="name"]';
    const nameCellText = await page.textContent(nameCellSelector);
    expect(nameCellText).toBe(newName);
  });
});
