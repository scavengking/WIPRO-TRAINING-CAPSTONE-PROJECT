
import { expect } from '@playwright/test';

export class BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * @param {string} path
     */
    async navigate(path) {
        await this.page.goto(path);
    }

    /**
     * A reusable method to wait for an element and click it
     * @param {import('@playwright/test').Locator} locator
     */
    async clickElement(locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    /**
     * A reusable method to fill inputs cleanly
     * @param {import('@playwright/test').Locator} locator
     * @param {string} text
     */
    async fillInput(locator, text) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }
}