export async function goToAccountsMacro (page) {
  await page.click('#buttonNav');
  await page.click('#navAccounts');
}

export async function addAccountMacro (page, name) {
  await goToAccountsMacro(page);
  await page.click('#buttonAddAccount');
  await page.fill('#inputName', name);
  await page.click('#buttonSave');
}
