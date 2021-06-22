import { chromium } from 'playwright';
import { DateTime } from 'luxon';
import { signInMacro } from '../../auth/tests';
import { addBalanceMacro } from '../../balances/tests';
import { goToAccountsMacro, addAccountMacro } from './macros';

describe('list accounts', () => {
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

  const dateCellSelector = '[role="cell"][data-field="date"]';
  const amountCellSelector = '[role="cell"][data-field="amount"]';

  test('account without balances show placeholder in last balances data', async () => {
    const name = 'savings';

    await signInMacro(page);
    await addAccountMacro(page, name);

    const dateCellText = await page.textContent(dateCellSelector);
    expect(dateCellText).toBe('');

    const amountCellText = await page.textContent(amountCellSelector);
    expect(amountCellText).toBe('');
  });

  test('account with balances show date and amount of the last balances', async () => {
    const name = 'savings';

    await signInMacro(page);
    await addAccountMacro(page, name);
    await addBalanceMacro(page);

    await goToAccountsMacro(page);

    const dateCellText = await page.textContent(dateCellSelector);
    expect(dateCellText).toBe(DateTime.now().toISODate());

    const amountCellText = await page.textContent(amountCellSelector);
    expect(amountCellText).toMatch('500');
  });
});
