
import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { HomePage } from '../pages/HomePage.js'; // <-- 1. Added import
import { ProductPage } from '../pages/ProductPage.js';
import {ProfilePage} from '../pages/ProfilePage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
/**
 * @typedef {object} MyFixtures
 * @property {import('@playwright/test').Page} preparedPage
 * @property {LoginPage} loginPage
 * @property {RegisterPage} registerPage 
 * @property {HomePage} homePage // <-- 2. Added property for VS Code autocomplete
 * @property {ProductPage} productPage
 * @property {ProfilePage} profilePage
 * @property {CheckoutPage} checkoutPage
 */

/** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & MyFixtures, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>} */
export const test = baseTest.extend({
    
    // 1. Instructor Concept: Custom preparedPage fixture
    preparedPage: async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    },

    // 2. Fixture for the LoginPage
    loginPage: async ({ preparedPage }, use) => {
        const loginPage = new LoginPage(preparedPage);
        await loginPage.goTo();
        await use(loginPage);
    },

    // 3. Fixture for the RegisterPage
    registerPage: async ({ preparedPage }, use) => {
        const registerPage = new RegisterPage(preparedPage);
        await registerPage.goTo();
        await use(registerPage);
    },

    // 4. New fixture specifically for the HomePage (Service 2)
    homePage: async ({ preparedPage }, use) => {
        const homePage = new HomePage(preparedPage);
        await homePage.goTo();
        await use(homePage);
    },
    // <-- ADD THIS NEW FIXTURE
    productPage: async ({ preparedPage }, use) => {
        const productPage = new ProductPage(preparedPage);
        await use(productPage);
    },
    profilePage: async ({ preparedPage }, use) => {
        const profilePage = new ProfilePage(preparedPage);
        await use(profilePage);
    },
    checkoutPage: async ({ preparedPage }, use) => {
        const checkoutPage = new CheckoutPage(preparedPage);
        await use(checkoutPage);
    }
});

// Export expect so we only need to import from this fixture file in our tests
export { expect };