import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addGroupMacro } from '../../groups/tests';
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
    await signInMacro(page);

    const group = 'investments';
    await addGroupMacro(page, group);

    const account = 'savings';
    await addAccountMacro(page, { account, group });

    const nameCellSelector = '[role="cell"][data-field="name"]';
    const nameCellText = await page.textContent(nameCellSelector);
    expect(nameCellText).toBe(account);

    const groupCellSelector = '[role="cell"][data-field="groupName"]';
    const groupCellText = await page.textContent(groupCellSelector);
    expect(groupCellText).toBe(group);
  });

  test('show error if empty account name', async () => {
    await signInMacro(page);
    await page.click('#buttonAddAccount');
    await page.click('#buttonSave');

    const error = await page.$('text=valid name is required');
    expect(error).toBeTruthy();
  });

  test('show error if another account with the same name already exists', async () => {
    await signInMacro(page);

    const account = 'savings';
    await addAccountMacro(page, { account });

    await addAccountMacro(page, { account });

    const error = await page.$('text=name is already in use');
    expect(error).toBeTruthy();
  });
});
