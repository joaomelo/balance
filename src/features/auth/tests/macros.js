import { baseUrl, credentials } from '../../../../tests/fixtures';

export async function signInMacro (page) {
  const { email, password } = credentials[0];

  await page.goto(baseUrl);
  await page.fill('#inputEmail', email);
  await page.fill('#inputPassword', password);

  await Promise.all([
    page.waitForNavigation({ url: '**/accounts' }),
    page.click('#buttonSignIn')
  ]);
}
