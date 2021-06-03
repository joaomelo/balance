import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addAccountMacro } from './macros';

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

  test('add account to repository with correct data shape', async () => {
    const name = 'savings';

    await signInMacro(page);
    await addAccountMacro(page, name);

    const firstListContent = await page.textContent('tbody td');
    expect(firstListContent).toBe(name);
  });

  test('show error if empty account name', async () => {
    await signInMacro(page);
    await page.click('#buttonAdd');
    await page.click('#buttonSave');

    const errorCode = await page.getAttribute('[data-error]', 'data-error');
    expect(errorCode).toBe('ACCOUNTS/NAME_INVALID');
  });

  test('show error if another account with the same name already exists', async () => {
    const name = 'savings';

    await signInMacro(page);
    await page.click('#buttonAdd');
    await page.fill('#inputName', name);
    await page.click('#buttonSave');

    await page.click('#buttonAdd');
    await page.fill('#inputName', name);
    await page.click('#buttonSave');

    const errorCode = await page.getAttribute('[data-error]', 'data-error');
    expect(errorCode).toBe('ACCOUNTS/NON_UNIQUE_NAME');
  });
});
