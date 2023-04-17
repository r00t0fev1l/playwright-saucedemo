import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/login-page";
import {CatalogListPage} from "../pages/catalog-list-page";
import {config} from "../config/config";

test.describe("Catalog list tests", async () => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']
    test(`Add to cart items`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.loginAsStandardUser();
        const catalogListPage = new CatalogListPage(page);
        for (const index in items) {
            const title = items[index];
            await catalogListPage.addToCart({title})
        }
        await expect(page.locator('#shopping_cart_container', {has: page.locator(".shopping_cart_badge", {hasText: items.length.toString()})})).toHaveCount(1)
    })

    test(`Remove from cart items`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.loginAsStandardUser();
        const catalogListPage = new CatalogListPage(page);
        for (const index in items) {
            const title = items[index];
            await catalogListPage.addToCart({title})
        }
        for (const index in items) {
            const title = items[index];
            await catalogListPage.removeFromCart({title})
        }
        await expect(page.locator('#shopping_cart_container', {has: page.locator(".shopping_cart_badge")})).toHaveCount(0)
    })

    test(`Logout`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.loginAsStandardUser();
        const catalogListPage = new CatalogListPage(page);
        await catalogListPage.logout();
        await expect(page).toHaveURL(config.url)
    })
});
