export async function goToAccountsMacro (page) {
  if (page.url().includes('accounts')) return;

  await page.click('#buttonNav');
  await Promise.all([
    page.waitForNavigation({ url: '**/accounts' }),
    page.click('#navAccounts')
  ]);
}

export async function addAccountMacro (page, name) {
  await goToAccountsMacro(page);
  await page.click('#buttonAddAccount');
  await page.fill('#inputName', name);
  await page.click('#buttonSave');
}
