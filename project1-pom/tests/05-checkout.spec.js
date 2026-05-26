import { test, expect } from '../fixtures/index.js';
import userData    from '../data/users.json'   with { type: 'json' };
import addressData from '../data/address.json' with { type: 'json' };

test.describe('Service 5 & 6 - Checkout Suite', () => {

    const user    = userData[0];
    const address = addressData[0];

    // Reset to home before every test to avoid state bleed
    test.beforeEach(async ({ homePage }) => {
        await homePage.goTo();
    });

    // ─────────────────────────────────────────────────────────────────────────
    // LOCAL HELPER
    // Adds the first product to the cart and clicks "Proceed to checkout" (step 1).
    // Shared by every test that starts from the home page without being logged in.
    // ─────────────────────────────────────────────────────────────────────────
    async function addToCartAndProceedStep1(homePage, productPage, checkoutPage) {
        await homePage.productNames.first().click();
        await productPage.clickAddToCart();
        await checkoutPage.goToCart();
        await checkoutPage.clickElement(checkoutPage.proceedStep1);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HAPPY PATH
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC10_Auth – Full checkout as a pre-authenticated user.
     * At step 2 the site shows "already logged in" and a Proceed button directly.
     */
    test('TC10_Auth - Complete E2E Checkout as Logged-In User', async ({
        homePage, loginPage, productPage, checkoutPage
    }) => {
        await test.step('Sign in via nav link', async () => {
            await homePage.page.getByRole('link', { name: 'Sign in' }).click();
            await loginPage.login(user.email, user.password);
            
            // 🛑 THE RACE CONDITION BLOCKER 🛑
            // Force Playwright to wait for the user menu to appear before moving on
            await expect(homePage.page.getByTestId('nav-menu')).toBeVisible();
        });

        await test.step('Add product to cart', async () => {
            await homePage.page.getByTestId('nav-home').click();
            await homePage.productNames.first().click();
            await productPage.clickAddToCart();
        });

        await test.step('Cart → Step 1', async () => {
            await checkoutPage.goToCart();
            await checkoutPage.clickElement(checkoutPage.proceedStep1);
        });

        await test.step('Step 2: Skip sign-in (already logged in)', async () => {
            // Login success is proven by reaching the success message.
            await checkoutPage.clickElement(checkoutPage.proceedStep2);
        });

        await test.step('Step 3: Fill billing address', async () => {
            await checkoutPage.fillAddress(address);
            await checkoutPage.clickElement(checkoutPage.proceedStep3);
        });

        await test.step('Step 4: Select payment and confirm', async () => {
            await checkoutPage.selectPaymentAndConfirm('cash-on-delivery');
        });

        await test.step('Verify: Payment success message visible', async () => {
            await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
        });
    });

    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC10_Guest – Full checkout as a guest user.
     */
    test('TC10_Guest - Complete E2E Checkout as Guest User', async ({
        homePage, productPage, checkoutPage
    }) => {
        await test.step('Add to cart without logging in', async () => {
            await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        });

        await test.step('Step 2: Continue as guest', async () => {
            await checkoutPage.continueAsGuest();
            await expect(checkoutPage.guestConfirmText).toBeVisible();
            await checkoutPage.clickElement(checkoutPage.proceedStep2);
        });

        await test.step('Step 3: Fill billing address', async () => {
            await checkoutPage.fillAddress(address);
            await checkoutPage.clickElement(checkoutPage.proceedStep3);
        });

        await test.step('Step 4: Select payment and confirm', async () => {
            await checkoutPage.selectPaymentAndConfirm('cash-on-delivery');
        });

        await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
    });

    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC13_Pos – Checkout with Bank Transfer payment method.
     */
    test('TC13_Pos - Checkout with Bank Transfer payment method', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        await checkoutPage.continueAsGuest();
        await checkoutPage.clickElement(checkoutPage.proceedStep2);
        await checkoutPage.fillAddress(address);
        await checkoutPage.clickElement(checkoutPage.proceedStep3);

        await checkoutPage.selectPaymentAndConfirm('bank-transfer');

        await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
    });

    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC15_Pos – Logged-in user sees the "already logged in" message at step 2.
     */
    test('TC15_Pos - Logged-in user sees correct message at Step 2', async ({
        homePage, loginPage, productPage, checkoutPage
    }) => {
        await homePage.page.getByRole('link', { name: 'Sign in' }).click();
        await loginPage.login(user.email, user.password);
        
        // 🛑 THE RACE CONDITION BLOCKER 🛑
        await expect(homePage.page.getByTestId('nav-menu')).toBeVisible();
        
        await homePage.page.getByTestId('nav-home').click();

        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);

        // "Hello John Doe, you are already logged in. You can proceed to checkout."
        await expect(checkoutPage.alreadyLoggedInMsg).toBeVisible();
    });

    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC16_Pos – Cart badge shows correct item count before checkout.
     */
    test('TC16_Pos - Cart badge shows item count after adding product', async ({
        homePage, productPage
    }) => {
        await homePage.productNames.first().click();
        await productPage.clickAddToCart();

        const cartBadge = homePage.page.locator('[data-test="cart-quantity"]');
        await expect(cartBadge).toHaveText('1');
    });

    // ─────────────────────────────────────────────────────────────────────────
    // NEGATIVE / VALIDATION TESTS
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC11_Neg – Confirm button stays disabled when no payment method is selected.
     * The site renders the button with disabled="", so clicking is not possible
     * by design. We assert the disabled state directly.
     */
    test('TC11_Neg - Confirm button is disabled when no payment method selected', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        await checkoutPage.continueAsGuest();
        await checkoutPage.clickElement(checkoutPage.proceedStep2);
        await checkoutPage.fillAddress(address);
        await checkoutPage.clickElement(checkoutPage.proceedStep3);

        // No payment selected — button must be disabled
        await expect(checkoutPage.finishButton).toBeDisabled();
    });

    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC11b_Neg – Selecting a payment method enables the Confirm button.
     * Companion to TC11_Neg — confirms the enabled state after selection.
     */
    test('TC11b_Neg - Confirm button enables after selecting payment method', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        await checkoutPage.continueAsGuest();
        await checkoutPage.clickElement(checkoutPage.proceedStep2);
        await checkoutPage.fillAddress(address);
        await checkoutPage.clickElement(checkoutPage.proceedStep3);

        await expect(checkoutPage.finishButton).toBeDisabled();

        await checkoutPage.paymentMethodSelect.selectOption('cash-on-delivery');
        await checkoutPage.paymentMethodSelect.dispatchEvent('change');

        await expect(checkoutPage.finishButton).toBeEnabled({ timeout: 10_000 });
    });

    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC12_Neg – Guest form shows all three required-field errors when empty.
     */
    test('TC12_Neg - Guest form shows all required field errors when empty', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        await checkoutPage.clickElement(checkoutPage.guestTab);

        // Submit without filling anything
        await checkoutPage.clickElement(checkoutPage.guestSubmitButton);

        await expect(checkoutPage.emailRequiredError).toBeVisible();
        await expect(checkoutPage.firstNameRequiredError).toBeVisible();
        await expect(checkoutPage.lastNameRequiredError).toBeVisible();
    });

    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC17_Neg – Guest form requires first and last name when only email is provided.
     */
    test('TC17_Neg - Guest form requires names when only email is provided', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        await checkoutPage.clickElement(checkoutPage.guestTab);
        await checkoutPage.fillInput(checkoutPage.guestEmailInput, 'guest@test.com');
        await checkoutPage.clickElement(checkoutPage.guestSubmitButton);

        await expect(checkoutPage.firstNameRequiredError).toBeVisible();
        await expect(checkoutPage.lastNameRequiredError).toBeVisible();
        await expect(checkoutPage.emailRequiredError).not.toBeVisible();
    });

    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC18_Neg – Guest form requires email when only names are provided.
     */
    test('TC18_Neg - Guest form requires email when only names are provided', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        await checkoutPage.clickElement(checkoutPage.guestTab);
        await checkoutPage.fillInput(checkoutPage.guestFirstNameInput, 'John');
        await checkoutPage.fillInput(checkoutPage.guestLastNameInput, 'Doe');
        await checkoutPage.clickElement(checkoutPage.guestSubmitButton);

        await expect(checkoutPage.emailRequiredError).toBeVisible();
        await expect(checkoutPage.firstNameRequiredError).not.toBeVisible();
        await expect(checkoutPage.lastNameRequiredError).not.toBeVisible();
    });

    // ─────────────────────────────────────────────────────────────────────────

    /**
     * TC19_Neg – Invalid email format is rejected by the guest form.
     */
    test('TC19_Neg - Guest form rejects invalid email format', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        await checkoutPage.continueAsGuest({ email: 'not-an-email', firstName: 'John', lastName: 'Doe' });

        // Guest confirmation text must NOT appear — form should block submission
        await expect(checkoutPage.guestConfirmText).not.toBeVisible();
    });

});