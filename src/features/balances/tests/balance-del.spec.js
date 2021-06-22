import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addAccountMacro } from '../../accounts/tests';
import { addBalanceMacro } from './macros';

describe('del balance', () => {
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

  test('del balance', async () => {
    await signInMacro(page);

    const name = 'savings';
    await addAccountMacro(page, name);
    await addBalanceMacro(page);

    const accountNameCellSelector = '[role="cell"][data-field="accountName"]';
    const accountNameCellText = await page.textContent(accountNameCellSelector);
    expect(accountNameCellText).toBe(name);

    const delButtonSelector = '[aria-label="delete"]';
    await page.click(delButtonSelector);

    const deletedAccount = await page.$(accountNameCellSelector);
    expect(deletedAccount).toBeNull();
  });
});
