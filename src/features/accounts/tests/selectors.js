const text = (page, sel) => page.locator(sel).textContent();
const row = (id) => `[role="row"][data-id="${id}"]`;
const cell = (field) => `[role="cell"][data-field="${field}"]`;

export const accountsSelectors = {
  list: {
    date: (page, id) => text(page, `${row(id)} >> ${cell("date")}`),
    amount: (page, id) => text(page, `${row(id)} >> ${cell("amount")}`),
  },
};
