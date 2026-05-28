import { test as baseTest, expect } from '@playwright/test';
import { LoginPage }    from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { HomePage }     from '../pages/HomePage.js';
import { ProductPage }  from '../pages/ProductPage.js';
import { ProfilePage }  from '../pages/ProfilePage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { AccountPage }  from '../pages/AccountPage.js';
import { ContactPage }  from '../pages/ContactPage.js';

/**
 * @typedef {object} MyFixtures
 * @property {import('@playwright/test').Page} preparedPage
 * @property {LoginPage}    loginPage
 * @property {RegisterPage} registerPage
 * @property {HomePage}     homePage
 * @property {ProductPage}  productPage
 * @property {ProfilePage}  profilePage
 * @property {CheckoutPage} checkoutPage
 * @property {AccountPage}  accountPage
 * @property {ContactPage}  contactPage
 */

/** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & MyFixtures, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>} */
export const test = baseTest.extend({

    // ── Base: navigates to / before each test ─────────────────────────────
    preparedPage: async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    },

    // ── Auth fixtures ──────────────────────────────────────────────────────
    loginPage: async ({ preparedPage }, use) => {
        const loginPage = new LoginPage(preparedPage);
        await loginPage.goTo();
        await use(loginPage);
    },

    registerPage: async ({ preparedPage }, use) => {
        const registerPage = new RegisterPage(preparedPage);
        await registerPage.goTo();
        await use(registerPage);
    },

    // ── Page fixtures ──────────────────────────────────────────────────────
    homePage: async ({ preparedPage }, use) => {
        const homePage = new HomePage(preparedPage);
        await homePage.goTo();
        await use(homePage);
    },

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
    },

    // ── Service 07 & 08 fixtures ───────────────────────────────────────────
    contactPage: async ({ preparedPage }, use) => {
        const contactPage = new ContactPage(preparedPage);
        await use(contactPage);
    },

    accountPage: async ({ preparedPage }, use) => {
        const accountPage = new AccountPage(preparedPage);
        await use(accountPage);
    },
});

export { expect };