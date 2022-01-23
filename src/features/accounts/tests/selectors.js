const text = (page, sel) => page.locator(sel).textContent();
const click = (page, sel) => {
  console.log({ sel, button: page.locator(sel) });
  page.click(sel);
};

const row = (id) => `[role="row"][data-id="${id}"]`;
const cell = (field) => `[role="cell"][data-field="${field}"]`;
const button = (label) => `[aria-label="${label}"]`;

export const listSelectors = {
  idByContent: async (page, content) => {
    const row = await page.locator(`[role="row"]:has-text("${content}")`);
    const id = await row.evaluate((r) => r.dataset.id);
    return id;
  },
  fieldById: (page, id, field) => text(page, `${row(id)} >> ${cell(field)}`),
  clickById: (page, id, label) => click(page, `${row(id)} >> ${button(label)}`),
};
