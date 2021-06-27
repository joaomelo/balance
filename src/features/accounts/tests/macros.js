export async function goToAccountsMacro (page) {
  if (page.url().includes('accounts')) return;

  await page.click('#buttonNav');
  await Promise.all([
    page.waitForNavigation({ url: '**/accounts' }),
    page.click('#navAccounts')
  ]);
}

export async function addAccountMacro (page, { account, group }) {
  await goToAccountsMacro(page);
  await page.click('#buttonAddAccount');

  await page.fill('#inputName', account);
  if (group) {
    await page.click('#selectGroup');
    await page.click(`[role="option"] >> text=${group}`, { force: true });
  }

  await page.click('#buttonSave');
}
