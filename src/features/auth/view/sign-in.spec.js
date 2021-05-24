import { chromium } from 'playwright';
import { credentials } from '../../../../tests/fixtures';

describe('sign in', () => {
  const baseUrl = 'http://localhost:8181/';
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

  it('signs in when correct credentials are provided', async () => {
    const { email, password } = credentials[0];

    await page.goto(baseUrl);
    await page.fill('#inputEmail', email);
    await page.fill('#inputPassword', password);

    await Promise.all([
      page.waitForNavigation({ url: '**/accounts' }),
      page.click('#buttonSignIn')
    ]);

    expect(page.url()).toMatch('/accounts');
  });

  it('show error message when email is invalid', async () => {
    await page.goto(baseUrl);

    await page.fill('#inputEmail', 'notAnEmail');
    await page.fill('#inputPassword', 'password');
    await page.click('#buttonSignIn');

    const error = await page.$("[data-error='AUTH/EMAIL_INVALID']");
    expect(error).not.toBeNull();
  });

  it('show error message when password is invalid', async () => {
    await page.goto(baseUrl);

    await page.fill('#inputEmail', 'email@email.com');
    await page.fill('#inputPassword', 'bad');
    await page.click('#buttonSignIn');

    const error = await page.$("[data-error='AUTH/PASSWORD_INVALID']");
    expect(error).not.toBeNull();
  });

  it('show error message when user does not exist', async () => {
    await page.goto(baseUrl);

    await page.fill('#inputEmail', 'email@email.com');
    await page.fill('#inputPassword', 'password');
    await page.click('#buttonSignIn');

    const error = await page.$("[data-error='IDENTITY/CREDENTIALS_UNRECOGNIZED']");
    expect(error).not.toBeNull();
  });

  it('show error message when password does no match', async () => {
    const { email, password } = credentials[0];

    await page.goto(baseUrl);

    await page.fill('#inputEmail', email);
    await page.fill('#inputPassword', `__${password}__`);
    await page.click('#buttonSignIn');

    const error = await page.$("[data-error='IDENTITY/CREDENTIALS_UNRECOGNIZED']");
    expect(error).not.toBeNull();
  });
});
