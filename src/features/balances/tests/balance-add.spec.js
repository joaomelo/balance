import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addAccountMacro } from '../../accounts/tests';

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

    await page.click('a >> text=Balances');
    await page.click('#buttonAdd');
    await page.fill('#inputAmount', '500');
    await page.click('#buttonSave');

    const firstListContent = await page.textContent('tbody td');
    expect(firstListContent).toBe(name);
  });

  test('show error if no account', async () => {
    await signInMacro(page);

    await page.click('a >> text=Balances');
    await page.click('#buttonAdd');
    await page.fill('#inputAmount', '500');
    await page.click('#buttonSave');

    const errorCode = await page.getAttribute('[data-error]', 'data-error');
    expect(errorCode).toBe('BALANCES/ACCOUNT_INVALID');
  });

  // test('show error if invalid date', async () => {
  //   await signInMacro(page);
  //   const name = 'savings';
  //   await addAccountMacro(page, name);

  //   await page.click('a >> text=Balances');
  //   await page.click('#buttonAdd');
  //   await page.press('#inputDate', 'Delete');
  //   await page.fill('#inputAmount', '500');
  //   await page.click('#buttonSave');

  //   const errorCode = await page.getAttribute('[data-error]', 'data-error');
  //   expect(errorCode).toBe('BALANCES/DATE_REQUIRED');
  // });

  // test('show error if another account with the same name already exists', async () => {
  //   const name = 'savings';

  //   await signInMacro(page);
  //   await page.click('#buttonAdd');
  //   await page.fill('#inputName', name);
  //   await page.click('#buttonSave');

  //   await page.click('#buttonAdd');
  //   await page.fill('#inputName', name);
  //   await page.click('#buttonSave');

  //   const errorCode = await page.getAttribute('[data-error]', 'data-error');
  //   expect(errorCode).toBe('ACCOUNTS/NON_UNIQUE_NAME');
  // });
});
