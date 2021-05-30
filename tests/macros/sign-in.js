import { credentials } from '../fixtures';
import { baseUrl } from './base';

export async function signIn (page) {
  const { email, password } = credentials[0];

  await page.goto(baseUrl);
  await page.fill('#inputEmail', email);
  await page.fill('#inputPassword', password);

  await Promise.all([
    page.waitForNavigation({ url: '**/accounts' }),
    page.click('#buttonSignIn')
  ]);
}
