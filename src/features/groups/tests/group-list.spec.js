import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addAccountMacro } from '../../accounts/tests';
import { addGroupMacro, goToGroupsMacro } from './macros';

describe('list groups', () => {
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

  test('proper show accounts data in list', async () => {
    const group = 'assets';

    await signInMacro(page);
    await addGroupMacro(page, group);

    const accountsCellSelector = '[role="cell"][data-field="accountsNames"]';
    const emptyAccountsCellText = await page.textContent(accountsCellSelector);
    expect(emptyAccountsCellText).toBe('');

    const account1 = 'car';
    await addAccountMacro(page, { group, account: account1 });

    const account2 = 'house';
    await addAccountMacro(page, { group, account: account2 });

    await goToGroupsMacro(page);
    const manyAccountsCellText = await page.textContent(accountsCellSelector);
    expect(manyAccountsCellText).toMatch(`${account1}, ${account2}`);
  });
});
