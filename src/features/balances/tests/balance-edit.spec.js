import { chromium } from 'playwright';
import { camelCase, asUtcIsoString } from '../../../app/helpers';
import { signInMacro } from '../../auth/tests';
import { addAccountMacro } from '../../accounts/tests';
import { addBalanceMacro } from './macros';

describe('edit balance', () => {
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

  test('edit balance amount and date', async () => {
    await signInMacro(page);

    const name = 'savings';
    await addAccountMacro(page, name);
    await addBalanceMacro(page);

    const buttonEditFilter = camelCase('button', 'edit', name, asUtcIsoString(new Date()));
    await page.click(`#${buttonEditFilter}`);

    const newDate = '2021-01-01';
    const newAmount = '100';
    await page.fill('#inputDate', newDate);
    await page.fill('#inputAmount', newAmount);
    await page.click('#buttonSave');

    const balanceDateFilter = camelCase('cell', 'date', name, newDate);
    const balanceDate = await page.textContent(`#${balanceDateFilter}`);
    expect(balanceDate).toBe(newDate);

    const balanceAmountFilter = camelCase('cell', 'amount', name, newDate);
    const balanceAmount = await page.textContent(`#${balanceAmountFilter}`);
    expect(balanceAmount).toBe(newAmount);
  });
});
