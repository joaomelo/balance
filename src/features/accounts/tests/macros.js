export async function goToAccounts(page) {
  if (page.url().includes("accounts")) return;

  await page.click("#buttonNav");
  await Promise.all([
    page.waitForNavigation({ url: "**/accounts" }),
    page.click("#navAccounts"),
  ]);
}

export async function addAccount(page, data) {
  await page.click("#buttonAddAccount");
  await setAccount(page, data);
}

export async function editAccount(page, id, newData) {
  await callEdit(page, id);
  await setAccount(page, newData);
}

export async function getIdOfContent(page, content) {
  const row = await page.locator(rowWithContentSelector(content));
  const id = await row.evaluate((r) => r.dataset.id);
  return id;
}

export async function getContentOfId(page, id, field) {
  return text(page, `${rowWithIdSelector(id)} >> ${cellSelector(field)}`);
}

export async function callDelete(page, id) {
  return clickButtonOfId(page, id, "delete");
}

export async function callEdit(page, id) {
  return clickButtonOfId(page, id, "edit");
}

async function setAccount(page, { name, group } = {}) {
  if (name) {
    await page.fill("#inputName", name);
  }

  if (group) {
    await page.click("#selectGroup");
    await page.click(`[role="option"] >> text=${group}`, { force: true });
  }

  await page.click("#buttonSave");
}

const rowWithIdSelector = (id) => `[role="row"][data-id="${id}"]`;
const rowWithContentSelector = (content) =>
  `[role="row"]:has-text("${content}")`;
const cellSelector = (field) => `[role="cell"][data-field="${field}"]`;
const buttonSelector = (label) => `[aria-label="${label}"]`;
const buttonOfIdSelector = (id, label) =>
  `${rowWithIdSelector(id)} >> ${buttonSelector(label)}`;

const text = (page, sel) => page.locator(sel).textContent();
const click = (page, sel) => page.locator(sel).click();
const clickButtonOfId = (page, id, label) =>
  click(page, buttonOfIdSelector(id, label));
