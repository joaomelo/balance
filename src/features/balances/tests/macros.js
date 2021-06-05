export async function addBalanceMacro (page) {
  await page.click('a >> text=Balances');
  await page.click('#buttonAddBalance');
  await page.fill('#inputAmount', '500');
  await page.click('#buttonSave');
}
