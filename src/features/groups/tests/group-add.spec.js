import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addGroupMacro, goToGroupsMacro } from './macros';

describe('add group', () => {
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

  test('add group to repository with correct data shape', async () => {
    await signInMacro(page);

    const name = 'assets';
    await addGroupMacro(page, name);

    const nameCellSelector = '[role="cell"][data-field="name"]';
    const nameCellText = await page.textContent(nameCellSelector);
    expect(nameCellText).toBe(name);
  });

  test('show error if empty group name', async () => {
    await signInMacro(page);

    await goToGroupsMacro(page);
    await page.click('#buttonAddGroup');
    await page.click('#buttonSave');

    const error = await page.$('text=name is required');
    expect(error).toBeTruthy();
  });

  test('show error if another group with the same name already exists', async () => {
    await signInMacro(page);

    const name = 'assets';
    await addGroupMacro(page, name);

    await addGroupMacro(page, name);

    const error = await page.$('text=already in use');
    expect(error).toBeTruthy();
  });
});
