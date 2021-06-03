export async function addAccountMacro (page, name) {
  await page.click('a >> text=Accounts');
  await page.click('#buttonAdd');
  await page.fill('#inputName', name);
  await page.click('#buttonSave');
}
