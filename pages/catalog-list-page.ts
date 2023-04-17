import {Page} from "@playwright/test";
import {config} from "../config/config";

export class CatalogListPage {
    page: Page

    constructor(page) {
        this.page = page;
    }

    addToCart = async ({title}) => {
        await this.page.locator(`.inventory_item`, {hasText: title}).locator('text=Add to cart').click()
    }

    removeFromCart = async ({title}) => {
        await this.page.locator(`.inventory_item`, {hasText: title}).locator('text=Remove').click()
    }

    gotToInventory = async () => {
        await this.page.goto(config.url + "/inventory.html")
    }

    async logout() {
        await this.page.locator('#react-burger-menu-btn').click()
        await this.page.locator('#logout_sidebar_link').click()
    }
}