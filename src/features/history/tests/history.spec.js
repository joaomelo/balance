import { chromium } from 'playwright';
import { signInMacro } from '../../auth/tests';
import { goToHistoryMacro } from './macros';

describe('history chart', () => {
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

  test('chart is rendered', async () => {
    await signInMacro(page);

    await goToHistoryMacro(page);

    const historyChart = await page.$('#balance-history');
    expect(historyChart).toBeTruthy();
  });
});
