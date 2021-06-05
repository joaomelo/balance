import { chromium } from 'playwright';
import { camelCase } from '../../../app/helpers';
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
    const name = 'savings';

    await signInMacro(page);
    await addAccountMacro(page, name);

    await page.click(`#${camelCase('button', 'edit', name)}`);

    const newName = 'credit card';
    await page.fill('#inputName', newName);
    await page.click('#buttonSave');

    const accountName = await page.textContent(`#${camelCase('cell', 'name', newName)}`);
    expect(accountName).toBe(newName);
  });
});
