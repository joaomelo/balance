export async function goToBalancesMacro (page) {
  if (page.url().includes('balances')) return;

  await page.click('#buttonNav');
  await Promise.all([
    page.waitForNavigation({ url: '**/balances' }),
    page.click('#navBalances')
  ]);
}

export async function addBalanceMacro (page) {
  await goToBalancesMacro(page);
  await page.click('#buttonAddBalance');
  await page.fill('#inputAmount', '500');
  await page.click('#buttonSave');
}
