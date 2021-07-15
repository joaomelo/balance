import { chromium } from 'playwright';
import { baseUrl } from '../../../../tests/fixtures';

describe('sign in', () => {
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

  it('can take user to home from a invalid route', async () => {
    await page.goto(`${baseUrl}some-invalid-route`);
    await page.waitForNavigation({ url: '**/not-found' });

    await page.click('text=Home Page');
    expect(page.url()).toMatch('/sign-in');
  });
});
