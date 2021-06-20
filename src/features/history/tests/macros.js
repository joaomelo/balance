export async function goToHistoryMacro (page) {
  await page.click('#buttonNav');
  await page.click('#navHistory');
}
