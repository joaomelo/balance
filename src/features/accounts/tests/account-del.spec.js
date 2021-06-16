import { chromium } from 'playwright';
import { DateTime } from 'luxon';
import { camelCase } from '../../../app/helpers';
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

    const name = 'savings';
    await addAccountMacro(page, name);

    const accountNameFilter = `#${camelCase('cell', 'name', name)}`;
    const accountName = await page.textContent(accountNameFilter);
    expect(accountName).toBe(name);

    await addBalanceMacro(page);

    const todayIso = DateTime.now().toISODate();
    const balanceNameFilter = `#${camelCase('cell', 'name', name, todayIso)}`;
    const balanceName = await page.textContent(balanceNameFilter);
    expect(balanceName).toBe(name);

    await goToAccountsMacro(page);
    await page.click(`#${camelCase('button', 'del', name)}`);

    const accountNameCell = await page.$(accountNameFilter);
    expect(accountNameCell).toBeNull();

    await goToBalancesMacro(page);
    const balanceNameCell = await page.$(balanceNameFilter);
    expect(balanceNameCell).toBeNull();
  });
});
