import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { camelCase } from '../../../app/helpers';

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

  test('del account', async () => {
    const name = 'savings';
    const accountFilter = `tbody td >> text=${name}`;

    await signInMacro(page);
    await page.click('#buttonAdd');
    await page.fill('#inputName', name);
    await page.click('#buttonSave');
    const addedAccount = await page.$(accountFilter);
    expect(addedAccount).toBeDefined();

    await page.click(`#${camelCase('button', 'del', name)}`);

    const deletedAccount = await page.$(accountFilter);
    expect(deletedAccount).toBeNull();
  });

  test.skip('del account and respective balances', async () => {
    expect(false).toBe(true);
  });
});
