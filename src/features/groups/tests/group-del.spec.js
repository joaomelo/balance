import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { addGroupMacro, goToGroupsMacro } from './macros';

describe('del group', () => {
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

  test('del group and dissociate from respective accounts', async () => {
    await signInMacro(page);

    const name = 'assets';
    await addGroupMacro(page, name);

    const groupNameCellSelector = '[role="cell"][data-field="name"]';
    const groupNameCellText = await page.textContent(groupNameCellSelector);
    expect(groupNameCellText).toBe(name);

    await goToGroupsMacro(page);
    const delButtonSelector = '[aria-label="delete"]';
    await page.click(delButtonSelector);

    const groupNameCell = await page.$(groupNameCellSelector);
    expect(groupNameCell).toBeNull();
  });
});
