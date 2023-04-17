import {Page} from "@playwright/test";
import {config} from "../config/config";

export class LoginPage {
    page: Page
    constructor(page ) {
        this.page = page;
    }

    async goToLoginPage() {
        await this.page.goto(config.url);
    }

    async login({login, password}) {
        await this.page.locator("#user-name").fill(login);
        await this.page.locator("#password").fill(password);
        await this.page.locator("#login-button").click();
    }

    async loginAsStandardUser() {
        await this.login(config.standard_user);
    }
}