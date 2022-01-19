import { chromium } from "playwright";
import { baseUrl, homePath, landingPath } from "../../../../tests/fixtures";
import { signOutMacro } from "../../auth/tests";

describe("sign in", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
  });

  afterEach(async () => {
    await page.close();
  });

  it("can take user to home page from a invalid route while signed in", async () => {
    await page.waitForNavigation({ url: `**${homePath}` });

    await page.goto(`${baseUrl}some-invalid-route`);
    await page.waitForNavigation({ url: "**/not-found" });

    await page.click("text=Home Page");
    expect(page.url()).toMatch(homePath);
  });

  it("can take user to sign in page from a invalid route", async () => {
    await signOutMacro(page);

    await page.goto(`${baseUrl}some-invalid-route`);
    await page.waitForNavigation({ url: "**/not-found" });

    await page.click("text=Home Page");
    expect(page.url()).toMatch(homePath);
  });
});
