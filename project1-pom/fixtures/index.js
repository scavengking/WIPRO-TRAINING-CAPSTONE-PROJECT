// @ts-check
import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

/**
 * @typedef {object} MyFixtures
 * @property {import('@playwright/test').Page} preparedPage
 * @property {LoginPage} loginPage
 */

/** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & MyFixtures, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>} */
export const test = baseTest.extend({
    
    // 1. Instructor Concept: Custom preparedPage fixture
    preparedPage: async ({ page }, use) => {
        // Go to the base URL automatically
        await page.goto('/');
        
        // Imagine handling a generic popup here if the site had one
        // await page.getByRole('button', { name: 'Accept Cookies' }).click();
        
        // Pass the ready page to the test
        await use(page);
    },

    // 2. We can even create a fixture specifically for the LoginPage
    loginPage: async ({ preparedPage }, use) => {
        const loginPage = new LoginPage(preparedPage);
        await loginPage.goTo();
        
        // Pass the instantiated POM to the test
        await use(loginPage);
    }
});

// Export expect so we only need to import from this fixture file in our tests
export { expect };