export async function goToGroupsMacro (page) {
  if (page.url().includes('groups')) return;

  await page.click('#buttonNav');
  await Promise.all([
    page.waitForNavigation({ url: '**/groups' }),
    page.click('#navGroups')
  ]);
}

export async function addGroupMacro (page, name) {
  await goToGroupsMacro(page);
  await page.click('#buttonAddGroup');
  await page.fill('#inputName', name);
  await page.click('#buttonSave');
}
