import { chromium } from 'playwright';
import { camelCase, asUtcIsoString } from '../../../app/helpers';
import { signInMacro } from '../../auth/tests';
import { addBalanceMacro } from '../../balances/tests';
import { goToAccountsMacro, addAccountMacro } from './macros';

describe('add account', () => {
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

  test('account without balances show placeholder in last balances data', async () => {
    const name = 'savings';

    await signInMacro(page);
    await addAccountMacro(page, name);

    const lastBalanceDate = await page.textContent(`#${camelCase('cell', 'date', name)}`);
    expect(lastBalanceDate).toBe('-');

    const lastBalanceAmount = await page.textContent(`#${camelCase('cell', 'amount', name)}`);
    expect(lastBalanceAmount).toBe('-');
  });

  test('account with balances show date and amount of the last balances', async () => {
    const name = 'savings';

    await signInMacro(page);
    await addAccountMacro(page, name);
    await addBalanceMacro(page);

    await goToAccountsMacro(page);

    const lastBalanceDate = await page.textContent(`#${camelCase('cell', 'date', name)}`);
    expect(lastBalanceDate).toBe(asUtcIsoString(new Date()));

    const lastBalanceAmount = await page.textContent(`#${camelCase('cell', 'amount', name)}`);
    expect(lastBalanceAmount).toBe('500');
  });
});
