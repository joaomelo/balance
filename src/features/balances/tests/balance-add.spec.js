import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addAccountMacro } from '../../accounts/tests';
import { addBalanceMacro, goToBalancesMacro } from './macros';

describe('add balance', () => {
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

  test('add balance to repository with correct data shape', async () => {
    await signInMacro(page);

    const name = 'savings';
    await addAccountMacro(page, name);

    await addBalanceMacro(page);

    const firstListContent = await page.textContent('tbody td');
    expect(firstListContent).toBe(name);
  });

  test('show error if no account', async () => {
    await signInMacro(page);

    await addBalanceMacro(page);

    const error = await page.$('text=account is required');
    expect(error).toBeTruthy();
  });

  test('show error if no amount', async () => {
    await signInMacro(page);
    const name = 'savings';
    await addAccountMacro(page, name);

    await goToBalancesMacro(page);
    await page.click('#buttonAddBalance');
    await page.fill('#inputAmount', '');
    await page.click('#buttonSave');

    const error = await page.$('text=amount is required');
    expect(error).toBeTruthy();
  });

  test('show error if invalid date', async () => {
    await signInMacro(page);
    const name = 'savings';
    await addAccountMacro(page, name);

    await goToBalancesMacro(page);
    await page.click('#buttonAddBalance');
    await page.press('#inputDate', 'Delete');
    await page.fill('#inputAmount', '500');
    await page.click('#buttonSave');

    const error = await page.$('text=date is required');
    expect(error).toBeTruthy();
  });

  test.only('show error if attempt to add same date to the same account more than once', async () => {
    await signInMacro(page);
    const name = 'savings';
    await addAccountMacro(page, name);

    await addBalanceMacro(page);
    console.log(1);
    await addBalanceMacro(page);
    console.log(2);

    const error = await page.$('text=already has a recorded balance for this date');
    expect(error).toBeTruthy();
  });
});
