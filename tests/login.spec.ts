import { test, expect } from '@playwright/test';
import {LoginPage} from "../pages/login-page";
import {config} from "../config/config";
import {CatalogListPage} from "../pages/catalog-list-page";

test.describe("Login tests", () => {
  test('Login with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.login(config.locked_out_user);
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });
  test('Success Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.login(config.standard_user);
    await expect(page).toHaveURL(config.url + "/inventory.html")
  });
})
