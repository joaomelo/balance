const text = (page, sel) => page.locator(sel).textContent();
const row = (id) => `[role="row"][data-id="${id}"]`;
const cell = (field) => `[role="cell"][data-field="${field}"]`;

export const listSelectors = {
  fieldById: (page, id, field) => text(page, `${row(id)} >> ${cell(field)}`),
  idByContent: async (page, content) => {
    const row = await page.locator(`[role="row"]:has-text("${content}")`);
    const id = await row.evaluate((r) => r.dataset.id);
    return id;
  },
};
