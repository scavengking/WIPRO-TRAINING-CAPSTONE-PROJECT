// @ts-check
import { expect } from '@playwright/test';

export class BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigates to a specific relative path using the Base URL
     * @param {string} path
     */
    async navigate(path) {
        await this.page.goto(path);
    }

    /**
     * A reusable method to click an element cleanly
     * Playwright automatically waits for the element to be visible and actionable
     * @param {import('@playwright/test').Locator} locator
     */
    async clickElement(locator) {
        await locator.click();
    }

    /**
     * A reusable method to fill inputs cleanly
     * Playwright automatically waits for the input to be visible and ready
     * @param {import('@playwright/test').Locator} locator
     * @param {string} text
     */
    async fillInput(locator, text) {
        await locator.fill(text);
    }
}