export async function goToHistoryMacro (page) {
  if (page.url().includes('history')) return;

  await page.click('#buttonNav');
  await Promise.all([
    page.waitForNavigation({ url: '**/history' }),
    page.click('#navAccountsHistory')
  ]);
}
