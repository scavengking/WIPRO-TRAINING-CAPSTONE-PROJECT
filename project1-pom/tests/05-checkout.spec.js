import { test, expect } from '../fixtures/index.js';
import addressData from '../data/address.json' with { type: 'json' };

const address = addressData[0];

// ─────────────────────────────────────────────────────────────────────────
// LOCAL HELPER: Shared by all checkout tests
// ─────────────────────────────────────────────────────────────────────────
async function addToCartAndProceedStep1(homePage, productPage, checkoutPage) {
    await homePage.productNames.first().click();
    await productPage.clickAddToCart();
    await checkoutPage.goToCart();
    await checkoutPage.clickElement(checkoutPage.proceedStep1);
}

// ============================================================================
// SUITE A: GUEST CHECKOUT FLOWS (Not Logged In)
// ============================================================================
test.describe('Service 5 - Checkout Suite (Guest)', () => {
    
    // CRITICAL: This wipes the global login cookie just for this block,
    // ensuring the user is truly treated as a guest.
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ homePage }) => {
        await homePage.goTo();
    });

    test('TC10_Guest - Complete E2E Checkout as Guest User', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        
        await checkoutPage.continueAsGuest();
        await expect(checkoutPage.guestConfirmText).toBeVisible();
        await checkoutPage.clickElement(checkoutPage.proceedStep2);
        
        await checkoutPage.fillAddress(address);
        await checkoutPage.clickElement(checkoutPage.proceedStep3);
        
        await checkoutPage.selectPaymentAndConfirm('cash-on-delivery');
        await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
    });

    test('TC13_Pos - Checkout with Bank Transfer payment method', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        
        await checkoutPage.continueAsGuest();
        await checkoutPage.clickElement(checkoutPage.proceedStep2);
        await checkoutPage.fillAddress(address);
        await checkoutPage.clickElement(checkoutPage.proceedStep3);

        // 1. Select the payment method
        await checkoutPage.paymentMethodSelect.selectOption('bank-transfer');
        await checkoutPage.paymentMethodSelect.dispatchEvent('change');

        // 2. Fill the dynamically revealed bank fields
        await checkoutPage.fillBankDetails('Global Test Bank', 'John Doe', '1234567890');

        // 3. Confirm and assert
        await expect(checkoutPage.finishButton).toBeEnabled({ timeout: 10_000 });
        await checkoutPage.finishButton.click();
        
        await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
    });

    test('TC20_Neg - Bank transfer requires numeric account number', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        
        await checkoutPage.continueAsGuest();
        await checkoutPage.clickElement(checkoutPage.proceedStep2);
        await checkoutPage.fillAddress(address);
        await checkoutPage.clickElement(checkoutPage.proceedStep3);

        await checkoutPage.paymentMethodSelect.selectOption('bank-transfer');
        await checkoutPage.paymentMethodSelect.dispatchEvent('change');

        // Pass invalid alphabetical characters into the account number field
        await checkoutPage.fillBankDetails('Global Test Bank', 'John Doe', 'ABCDEFGHIJ');
        
        // Trigger Angular's validation by clicking away (blurring) or attempting to submit
        await checkoutPage.accountNumberInput.blur();

        // Assert that the specific numeric error message appears
        await expect(checkoutPage.accountNumberError).toBeVisible();

        // FIX: Assert that the application correctly prevents submission by disabling the button
        await expect(checkoutPage.finishButton).toBeDisabled();
    });
    

    test('TC11_Neg - Confirm button is disabled when no payment method selected', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        await checkoutPage.continueAsGuest();
        await checkoutPage.clickElement(checkoutPage.proceedStep2);
        await checkoutPage.fillAddress(address);
        await checkoutPage.clickElement(checkoutPage.proceedStep3);

        await expect(checkoutPage.finishButton).toBeDisabled();
    });

    test('TC12_Neg - Guest form shows all required field errors when empty', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        await checkoutPage.clickElement(checkoutPage.guestTab);
        await checkoutPage.clickElement(checkoutPage.guestSubmitButton);

        await expect(checkoutPage.emailRequiredError).toBeVisible();
        await expect(checkoutPage.firstNameRequiredError).toBeVisible();
        await expect(checkoutPage.lastNameRequiredError).toBeVisible();
    });

    test('TC17_Neg - Guest form requires names when only email is provided', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        await checkoutPage.clickElement(checkoutPage.guestTab);
        await checkoutPage.fillInput(checkoutPage.guestEmailInput, 'guest@test.com');
        await checkoutPage.clickElement(checkoutPage.guestSubmitButton);

        await expect(checkoutPage.firstNameRequiredError).toBeVisible();
        await expect(checkoutPage.lastNameRequiredError).toBeVisible();
    });
});

// ============================================================================
// SUITE B: AUTHENTICATED CHECKOUT FLOWS (Logged In)
// ============================================================================
test.describe('Service 6 - Checkout Suite (Logged-In)', () => {

    // No test.use override here! 
    // Playwright will naturally use the cookie from auth.setup.js.

    test.beforeEach(async ({ homePage }) => {
        await homePage.goTo();
    });

    test('TC10_Auth - Complete E2E Checkout as Logged-In User', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);

        // We are already logged in, so we just click proceed on step 2
        await checkoutPage.clickElement(checkoutPage.proceedStep2);
        
        await checkoutPage.fillAddress(address);
        await checkoutPage.clickElement(checkoutPage.proceedStep3);
        
        await checkoutPage.selectPaymentAndConfirm('cash-on-delivery');
        await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
    });

    test('TC15_Pos - Logged-in user sees correct message at Step 2', async ({
        homePage, productPage, checkoutPage
    }) => {
        await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
        
        // "Hello <Name>, you are already logged in. You can proceed to checkout."
        await expect(checkoutPage.alreadyLoggedInMsg).toBeVisible();
    });

    test('TC16_Pos - Cart badge shows item count after adding product', async ({
        homePage, productPage
    }) => {
        await homePage.productNames.first().click();
        await productPage.clickAddToCart();

        const cartBadge = homePage.page.locator('[data-test="cart-quantity"]');
        await expect(cartBadge).toHaveText('1');
    });
});