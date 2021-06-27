import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addBalanceMacro, goToBalancesMacro } from '../../balances/tests';
import { addAccountMacro, goToAccountsMacro } from './macros';

describe('del account', () => {
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

  test('del account and respective balances', async () => {
    await signInMacro(page);

    const account = 'savings';
    await addAccountMacro(page, { account });

    const accountNameCellSelector = '[role="cell"][data-field="name"]';
    const accountNameCellText = await page.textContent(accountNameCellSelector);
    expect(accountNameCellText).toBe(account);

    await addBalanceMacro(page);

    const balanceAccountNameSelector = '[role="cell"][data-field="accountName"]';
    const balanceAccountNameText = await page.textContent(balanceAccountNameSelector);
    expect(balanceAccountNameText).toBe(account);

    await goToAccountsMacro(page);
    const delButtonSelector = '[aria-label="delete"]';
    await page.click(delButtonSelector);

    const accountNameCell = await page.$(accountNameCellSelector);
    expect(accountNameCell).toBeNull();

    await goToBalancesMacro(page);
    const balanceAccountNameCell = await page.$(balanceAccountNameSelector);
    expect(balanceAccountNameCell).toBeNull();
  });
});
