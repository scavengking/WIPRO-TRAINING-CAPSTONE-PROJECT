# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-checkout.spec.js >> Service 5 - Checkout Suite (Guest) >> TC11_Neg - Confirm button is disabled when no payment method selected
- Location: tests\05-checkout.spec.js:104:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByTestId('product-name').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - text: View the
    - link "Documentation" [ref=e4] [cursor=pointer]:
      - /url: https://testsmith-io.github.io/practice-software-testing/#/
    - text: for this application.
  - generic [ref=e5]:
    - generic [ref=e7]:
      - generic [ref=e8]: Practice Black Box Testing & Bug Hunting
      - button "Testing Guide" [ref=e9] [cursor=pointer]
      - button "🐛 Bug Hunting" [ref=e10] [cursor=pointer]
    - navigation [ref=e11]:
      - generic [ref=e12]:
        - link "Practice Software Testing - Toolshop" [ref=e13] [cursor=pointer]:
          - /url: /
          - img [ref=e14]
        - generic [ref=e32]:
          - menubar "Main menu" [ref=e33]:
            - menuitem "Home" [ref=e34]:
              - link "Home" [ref=e35] [cursor=pointer]:
                - /url: /
            - menuitem "Categories" [ref=e36]:
              - button "Categories" [ref=e37] [cursor=pointer]
            - menuitem "Contact" [ref=e38]:
              - link "Contact" [ref=e39] [cursor=pointer]:
                - /url: /contact
            - menuitem "Sign in" [ref=e40]:
              - link "Sign in" [ref=e41] [cursor=pointer]:
                - /url: /auth/login
          - button "Select language" [ref=e43] [cursor=pointer]:
            - img [ref=e45]
            - text: EN
  - paragraph [ref=e49]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e50] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. |
    - link "Privacy Policy" [ref=e51] [cursor=pointer]:
      - /url: /privacy
    - text: "| Banner photo by"
    - link "Barn Images" [ref=e52] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e53] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e55] [cursor=pointer]:
    - img [ref=e56]
```

# Test source

```ts
  1   | import { test, expect } from '../fixtures/index.js';
  2   | import addressData from '../data/address.json' with { type: 'json' };
  3   | 
  4   | const address = addressData[0];
  5   | 
  6   | // ─────────────────────────────────────────────────────────────────────────
  7   | // LOCAL HELPER: Shared by all checkout tests
  8   | // ─────────────────────────────────────────────────────────────────────────
  9   | async function addToCartAndProceedStep1(homePage, productPage, checkoutPage) {
  10  |     // Ensure the product grid has actually loaded before clicking
> 11  |     await homePage.productNames.first().waitFor({ state: 'visible', timeout: 15000 });
      |                                         ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  12  |     await homePage.productNames.first().click();
  13  |     
  14  |     await productPage.clickAddToCart();
  15  |     
  16  |     // Wait for the dynamic cart badge to update, confirming the backend registered the item
  17  |     const cartBadge = productPage.page.locator('[data-test="cart-quantity"]');
  18  |     await expect(cartBadge).toHaveText(/^[1-9]\d*$/, { timeout: 10000 }); 
  19  |     
  20  |     await checkoutPage.goToCart();
  21  |     await checkoutPage.clickElement(checkoutPage.proceedStep1);
  22  | }
  23  | 
  24  | // ============================================================================
  25  | // SUITE A: GUEST CHECKOUT FLOWS (Not Logged In)
  26  | // ============================================================================
  27  | test.describe('Service 5 - Checkout Suite (Guest)', () => {
  28  |     
  29  |     // CRITICAL: This wipes the global login cookie just for this block,
  30  |     // ensuring the user is truly treated as a guest.
  31  |     test.use({ storageState: { cookies: [], origins: [] } });
  32  | 
  33  |     test.beforeEach(async ({ homePage }) => {
  34  |         await homePage.goTo();
  35  |     });
  36  | 
  37  |     test('TC10_Guest - Complete E2E Checkout as Guest User', async ({
  38  |         homePage, productPage, checkoutPage
  39  |     }) => {
  40  |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  41  |         
  42  |         await checkoutPage.continueAsGuest();
  43  |         await expect(checkoutPage.guestConfirmText).toBeVisible();
  44  |         await checkoutPage.clickElement(checkoutPage.proceedStep2);
  45  |         
  46  |         await checkoutPage.fillAddress(address);
  47  |         await checkoutPage.clickElement(checkoutPage.proceedStep3);
  48  |         
  49  |         await checkoutPage.selectPaymentAndConfirm('cash-on-delivery');
  50  |         await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
  51  |     });
  52  | 
  53  |     test('TC13_Pos - Checkout with Bank Transfer payment method', async ({
  54  |         homePage, productPage, checkoutPage
  55  |     }) => {
  56  |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  57  |         
  58  |         await checkoutPage.continueAsGuest();
  59  |         await checkoutPage.clickElement(checkoutPage.proceedStep2);
  60  |         await checkoutPage.fillAddress(address);
  61  |         await checkoutPage.clickElement(checkoutPage.proceedStep3);
  62  | 
  63  |         // 1. Select the payment method
  64  |         await checkoutPage.paymentMethodSelect.selectOption('bank-transfer');
  65  |         await checkoutPage.paymentMethodSelect.dispatchEvent('change');
  66  | 
  67  |         // 2. Fill the dynamically revealed bank fields
  68  |         await checkoutPage.fillBankDetails('Global Test Bank', 'John Doe', '1234567890');
  69  | 
  70  |         // 3. Confirm and assert
  71  |         await expect(checkoutPage.finishButton).toBeEnabled({ timeout: 10_000 });
  72  |         await checkoutPage.finishButton.click();
  73  |         
  74  |         await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
  75  |     });
  76  | 
  77  |     test('TC20_Neg - Bank transfer requires numeric account number', async ({
  78  |         homePage, productPage, checkoutPage
  79  |     }) => {
  80  |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  81  |         
  82  |         await checkoutPage.continueAsGuest();
  83  |         await checkoutPage.clickElement(checkoutPage.proceedStep2);
  84  |         await checkoutPage.fillAddress(address);
  85  |         await checkoutPage.clickElement(checkoutPage.proceedStep3);
  86  | 
  87  |         await checkoutPage.paymentMethodSelect.selectOption('bank-transfer');
  88  |         await checkoutPage.paymentMethodSelect.dispatchEvent('change');
  89  | 
  90  |         // Pass invalid alphabetical characters into the account number field
  91  |         await checkoutPage.fillBankDetails('Global Test Bank', 'John Doe', 'ABCDEFGHIJ');
  92  |         
  93  |         // Trigger Angular's validation by clicking away (blurring) or attempting to submit
  94  |         await checkoutPage.accountNumberInput.blur();
  95  | 
  96  |         // Assert that the specific numeric error message appears
  97  |         await expect(checkoutPage.accountNumberError).toBeVisible();
  98  | 
  99  |         // FIX: Assert that the application correctly prevents submission by disabling the button
  100 |         await expect(checkoutPage.finishButton).toBeDisabled();
  101 |     });
  102 |     
  103 | 
  104 |     test('TC11_Neg - Confirm button is disabled when no payment method selected', async ({
  105 |         homePage, productPage, checkoutPage
  106 |     }) => {
  107 |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  108 |         await checkoutPage.continueAsGuest();
  109 |         await checkoutPage.clickElement(checkoutPage.proceedStep2);
  110 |         await checkoutPage.fillAddress(address);
  111 |         await checkoutPage.clickElement(checkoutPage.proceedStep3);
```