import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addGroupMacro } from './macros';

describe('edit group', () => {
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

  test('edit group name', async () => {
    await signInMacro(page);

    const name = 'assets';
    await addGroupMacro(page, name);

    const editButtonSelector = '[aria-label="edit"]';
    await page.click(editButtonSelector);

    const newName = 'net';
    await page.fill('#inputName', newName);
    await page.click('#buttonSave');

    const nameCellSelector = '[role="cell"][data-field="name"]';
    const nameCellText = await page.textContent(nameCellSelector);
    expect(nameCellText).toBe(newName);
  });
});
