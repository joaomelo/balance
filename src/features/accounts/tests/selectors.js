const rowWithId = (id) => `[role="row"][data-id="${id}"]`;
const rowWithContent = (content) => `[role="row"]:has-text("${content}")`;
const cell = (field) => `[role="cell"][data-field="${field}"]`;

const button = (label) => `[aria-label="${label}"]`;
const buttonOfId = (id, label) => `${rowWithId(id)} >> ${button(label)}`;

const text = (page, sel) => page.locator(sel).textContent();
const click = (page, sel) => page.locator(sel).click();

const clickById = (page, id, label) => click(page, buttonOfId(id, label));

export const listSelectors = {
  getIdOfContent: async (page, content) => {
    const row = await page.locator(rowWithContent(content));
    const id = await row.evaluate((r) => r.dataset.id);
    return id;
  },
  getContentOfId: (page, id, field) =>
    text(page, `${rowWithId(id)} >> ${cell(field)}`),
  callDelete: (page, id) => clickById(page, id, "delete"),
  callEdit: (page, id) => clickById(page, id, "edit"),
};
