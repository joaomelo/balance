import { chromium } from 'playwright';
import { baseUrl, credentials } from '../../../../tests/fixtures';
import { signInMacro } from './macros';

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

  it('signs in when correct credentials are provided', async () => {
    await signInMacro(page);

    expect(page.url()).toMatch('/accounts');
  });

  it('show error message when email is invalid', async () => {
    await page.goto(baseUrl);

    await page.fill('#inputEmail', 'notAnEmail');
    await page.fill('#inputPassword', 'password');
    await page.click('#buttonSignIn');

    const errorCode = await page.getAttribute('[data-error]', 'data-error');
    expect(errorCode).toBe('AUTH/EMAIL_INVALID');
  });

  it('show error message when password is invalid', async () => {
    await page.goto(baseUrl);

    await page.fill('#inputEmail', 'email@email.com');
    await page.fill('#inputPassword', 'bad');
    await page.click('#buttonSignIn');

    const errorCode = await page.getAttribute('[data-error]', 'data-error');
    expect(errorCode).toBe('AUTH/PASSWORD_INVALID');
  });

  it('show error message when user does not exist', async () => {
    await page.goto(baseUrl);

    await page.fill('#inputEmail', 'email@email.com');
    await page.fill('#inputPassword', 'password');
    await page.click('#buttonSignIn');

    const errorCode = await page.getAttribute('[data-error]', 'data-error');
    expect(errorCode).toBe('IDENTITY/CREDENTIALS_UNRECOGNIZED');
  });

  it('show error message when password does no match', async () => {
    const { email, password } = credentials[0];

    await page.goto(baseUrl);

    await page.fill('#inputEmail', email);
    await page.fill('#inputPassword', `__${password}__`);
    await page.click('#buttonSignIn');

    const errorCode = await page.getAttribute('[data-error]', 'data-error');
    expect(errorCode).toBe('IDENTITY/CREDENTIALS_UNRECOGNIZED');
  });
});
