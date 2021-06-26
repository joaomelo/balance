import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { goToGroupsMacro, addGroupMacro } from './macros';

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

  const dateCellSelector = '[role="cell"][data-field="accounts"]';

  test('group without accounts show empty cell', async () => {
    const name = 'assets';

    await signInMacro(page);
    await addGroupMacro(page, name);

    const accountsCellText = await page.textContent(dateCellSelector);
    expect(accountsCellText).toBe('');
  });

  // test('group with balances show date and amount of the last balances', async () => {
  //   const name = 'savings';

  //   await signInMacro(page);
  //   await addGroupMacro(page, name);
  //   await addBalanceMacro(page);

  //   await goToGroupsMacro(page);

  //   const dateCellText = await page.textContent(dateCellSelector);
  //   expect(dateCellText).toBe(DateTime.now().toISODate());

  //   const amountCellText = await page.textContent(amountCellSelector);
  //   expect(amountCellText).toMatch('500');
  // });
});
