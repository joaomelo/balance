import { chromium } from "playwright";
import { baseUrl, homePath, credentials } from "../../../../tests/fixtures";
import { signInMacro, signOutMacro } from "./macros";

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
  });

  afterEach(async () => {
    await page.close();
  });

  it("signs in when correct credentials are provided", async () => {
    await page.goto(baseUrl);
    await signOutMacro(page);
    await signInMacro(page);

    expect(page.url()).toMatch(homePath);
  });

  it("show error message when email is invalid", async () => {
    await page.goto(baseUrl);
    await signOutMacro(page);

    await page.fill("#inputEmail", "notAnEmail");
    await page.fill("#inputPassword", "password");
    await page.click("#buttonSignIn");

    const error = await page.$("text=invalid email");
    expect(error).toBeTruthy();
  });

  it("show error message when password is invalid", async () => {
    await page.goto(baseUrl);
    await signOutMacro(page);

    await page.fill("#inputEmail", "email@email.com");
    await page.fill("#inputPassword", "bad");
    await page.click("#buttonSignIn");

    const error = await page.$("text=invalid password");
    expect(error).toBeTruthy();
  });

  it("show error message when user does not exist", async () => {
    await page.goto(baseUrl);
    await signOutMacro(page);

    await page.fill("#inputEmail", "email@email.com");
    await page.fill("#inputPassword", "password");
    await page.click("#buttonSignIn");

    const error = await page.$("text=does not exist");
    expect(error).toBeTruthy();
  });

  it("show error message when password does no match", async () => {
    await page.goto(baseUrl);
    await signOutMacro(page);

    const { email, password } = credentials[0];
    await page.fill("#inputEmail", email);
    await page.fill("#inputPassword", `__${password}__`);
    await page.click("#buttonSignIn");

    const error = await page.$("text=does not exist");
    expect(error).toBeTruthy();
  });
});
