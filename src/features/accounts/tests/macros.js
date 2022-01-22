export async function goToAccountsMacro(page) {
  if (page.url().includes("accounts")) return;

  await page.click("#buttonNav");
  await Promise.all([
    page.waitForNavigation({ url: "**/accounts" }),
    page.click("#navAccounts"),
  ]);
}

export async function addAccountMacro(page, { name, group } = {}) {
  await page.click("#buttonAddAccount");

  if (name) {
    await page.fill("#inputName", name);
  }

  if (group) {
    await page.click("#selectGroup");
    await page.click(`[role="option"] >> text=${group}`, { force: true });
  }

  await page.click("#buttonSave");
}
