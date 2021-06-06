export async function goToBalancesMacro (page) {
  await page.click('a >> text=Balances');
}

export async function addBalanceMacro (page) {
  await goToBalancesMacro(page);
  await page.click('#buttonAddBalance');
  await page.fill('#inputAmount', '500');
  await page.click('#buttonSave');
}
