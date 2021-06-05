import { chromium } from 'playwright';
import { camelCase, asUtcIsoString } from '../../../app/helpers';
import { signInMacro } from '../../auth/tests';
import { addAccountMacro } from '../../accounts/tests';
import { addBalanceMacro } from './macros';

describe('del balance', () => {
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

  test('del balance', async () => {
    const name = 'savings';

    await signInMacro(page);
    await addAccountMacro(page, name);
    await addBalanceMacro(page);

    const balanceFilter = `tbody td >> text=${name}`;
    const addedBalance = await page.$(balanceFilter);
    expect(addedBalance).toBeDefined();

    const buttonDelId = camelCase('button', 'del', name, asUtcIsoString(new Date()));
    await page.click(`#${buttonDelId}`);

    const deletedAccount = await page.$(balanceFilter);
    expect(deletedAccount).toBeNull();
  });
});
