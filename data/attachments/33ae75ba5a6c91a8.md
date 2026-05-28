# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-checkout.spec.js >> Service 5 & 6 - Checkout Suite >> TC13_Pos - Checkout with Bank Transfer payment method
- Location: tests/05-checkout.spec.js:112:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('payment-success-message')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('payment-success-message')

```

```yaml
- text: View the
- link "Documentation":
  - /url: https://testsmith-io.github.io/practice-software-testing/#/
- text: for this application. Practice Black Box Testing & Bug Hunting
- button "Testing Guide"
- button "🐛 Bug Hunting"
- navigation:
  - link "Practice Software Testing - Toolshop":
    - /url: /
    - img
  - menubar "Main menu":
    - menuitem "Home":
      - link "Home":
        - /url: /
    - menuitem "Categories":
      - button "Categories"
    - menuitem "Contact":
      - link "Contact":
        - /url: /contact
    - menuitem "Sign in":
      - link "Sign in":
        - /url: /auth/login
    - menuitem "cart":
      - link "cart":
        - /url: /checkout
        - text: "1"
  - button "Select language": EN
- list:
  - listitem: Cart 1
  - listitem: Sign in 2
  - listitem: Billing Address 3
  - listitem: Payment 4
- heading "Payment" [level=3]
- text: Payment Method
- combobox "Payment Method":
  - option "Choose your payment method" [disabled]
  - option "Bank Transfer" [selected]
  - option "Cash on Delivery"
  - option "Credit Card"
  - option "Buy Now Pay Later"
  - option "Gift Card"
- text: Bank Name
- textbox "Bank Name"
- text: Account Name
- textbox "Account Name"
- text: Account Number
- textbox "Account Number"
- text: Please enter your bank account number as it appears on your bank statement. It's a unique series of numbers used to identify your individual account. Avoid including any spaces or hyphens. Unknown error
- button "Confirm"
- paragraph:
  - text: This is a DEMO application (
  - link "GitHub repo":
    - /url: https://github.com/testsmith-io/practice-software-testing
  - text: ), used for software testing training purpose. |
  - link "Privacy Policy":
    - /url: /privacy
  - text: "| Banner photo by"
  - link "Barn Images":
    - /url: https://unsplash.com/@barnimages
  - text: "on"
  - link "Unsplash":
    - /url: https://unsplash.com/photos/t5YUoHW6zRo
  - text: .
- button "Open chat":
  - img
```

# Test source

```ts
  23  |         await checkoutPage.goToCart();
  24  |         await checkoutPage.clickElement(checkoutPage.proceedStep1);
  25  |     }
  26  | 
  27  |     // ─────────────────────────────────────────────────────────────────────────
  28  |     // HAPPY PATH
  29  |     // ─────────────────────────────────────────────────────────────────────────
  30  | 
  31  |     /**
  32  |      * TC10_Auth – Full checkout as a pre-authenticated user.
  33  |      * At step 2 the site shows "already logged in" and a Proceed button directly.
  34  |      */
  35  |     test('TC10_Auth - Complete E2E Checkout as Logged-In User', async ({
  36  |         homePage, loginPage, productPage, checkoutPage
  37  |     }) => {
  38  |         await test.step('Sign in via nav link', async () => {
  39  |             await homePage.page.getByRole('link', { name: 'Sign in' }).click();
  40  |             await loginPage.login(user.email, user.password);
  41  |             
  42  |             // 🛑 THE RACE CONDITION BLOCKER 🛑
  43  |             // Force Playwright to wait for the user menu to appear before moving on
  44  |             await expect(homePage.page.getByTestId('nav-menu')).toBeVisible();
  45  |         });
  46  | 
  47  |         await test.step('Add product to cart', async () => {
  48  |             await homePage.page.getByTestId('nav-home').click();
  49  |             await homePage.productNames.first().click();
  50  |             await productPage.clickAddToCart();
  51  |         });
  52  | 
  53  |         await test.step('Cart → Step 1', async () => {
  54  |             await checkoutPage.goToCart();
  55  |             await checkoutPage.clickElement(checkoutPage.proceedStep1);
  56  |         });
  57  | 
  58  |         await test.step('Step 2: Skip sign-in (already logged in)', async () => {
  59  |             // Login success is proven by reaching the success message.
  60  |             await checkoutPage.clickElement(checkoutPage.proceedStep2);
  61  |         });
  62  | 
  63  |         await test.step('Step 3: Fill billing address', async () => {
  64  |             await checkoutPage.fillAddress(address);
  65  |             await checkoutPage.clickElement(checkoutPage.proceedStep3);
  66  |         });
  67  | 
  68  |         await test.step('Step 4: Select payment and confirm', async () => {
  69  |             await checkoutPage.selectPaymentAndConfirm('cash-on-delivery');
  70  |         });
  71  | 
  72  |         await test.step('Verify: Payment success message visible', async () => {
  73  |             await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
  74  |         });
  75  |     });
  76  | 
  77  |     // ─────────────────────────────────────────────────────────────────────────
  78  | 
  79  |     /**
  80  |      * TC10_Guest – Full checkout as a guest user.
  81  |      */
  82  |     test('TC10_Guest - Complete E2E Checkout as Guest User', async ({
  83  |         homePage, productPage, checkoutPage
  84  |     }) => {
  85  |         await test.step('Add to cart without logging in', async () => {
  86  |             await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  87  |         });
  88  | 
  89  |         await test.step('Step 2: Continue as guest', async () => {
  90  |             await checkoutPage.continueAsGuest();
  91  |             await expect(checkoutPage.guestConfirmText).toBeVisible();
  92  |             await checkoutPage.clickElement(checkoutPage.proceedStep2);
  93  |         });
  94  | 
  95  |         await test.step('Step 3: Fill billing address', async () => {
  96  |             await checkoutPage.fillAddress(address);
  97  |             await checkoutPage.clickElement(checkoutPage.proceedStep3);
  98  |         });
  99  | 
  100 |         await test.step('Step 4: Select payment and confirm', async () => {
  101 |             await checkoutPage.selectPaymentAndConfirm('cash-on-delivery');
  102 |         });
  103 | 
  104 |         await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
  105 |     });
  106 | 
  107 |     // ─────────────────────────────────────────────────────────────────────────
  108 | 
  109 |     /**
  110 |      * TC13_Pos – Checkout with Bank Transfer payment method.
  111 |      */
  112 |     test('TC13_Pos - Checkout with Bank Transfer payment method', async ({
  113 |         homePage, productPage, checkoutPage
  114 |     }) => {
  115 |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  116 |         await checkoutPage.continueAsGuest();
  117 |         await checkoutPage.clickElement(checkoutPage.proceedStep2);
  118 |         await checkoutPage.fillAddress(address);
  119 |         await checkoutPage.clickElement(checkoutPage.proceedStep3);
  120 | 
  121 |         await checkoutPage.selectPaymentAndConfirm('bank-transfer');
  122 | 
> 123 |         await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
      |                                                          ^ Error: expect(locator).toBeVisible() failed
  124 |     });
  125 | 
  126 |     // ─────────────────────────────────────────────────────────────────────────
  127 | 
  128 |     /**
  129 |      * TC15_Pos – Logged-in user sees the "already logged in" message at step 2.
  130 |      */
  131 |     test('TC15_Pos - Logged-in user sees correct message at Step 2', async ({
  132 |         homePage, loginPage, productPage, checkoutPage
  133 |     }) => {
  134 |         await homePage.page.getByRole('link', { name: 'Sign in' }).click();
  135 |         await loginPage.login(user.email, user.password);
  136 |         
  137 |         // 🛑 THE RACE CONDITION BLOCKER 🛑
  138 |         await expect(homePage.page.getByTestId('nav-menu')).toBeVisible();
  139 |         
  140 |         await homePage.page.getByTestId('nav-home').click();
  141 | 
  142 |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  143 | 
  144 |         // "Hello John Doe, you are already logged in. You can proceed to checkout."
  145 |         await expect(checkoutPage.alreadyLoggedInMsg).toBeVisible();
  146 |     });
  147 | 
  148 |     // ─────────────────────────────────────────────────────────────────────────
  149 | 
  150 |     /**
  151 |      * TC16_Pos – Cart badge shows correct item count before checkout.
  152 |      */
  153 |     test('TC16_Pos - Cart badge shows item count after adding product', async ({
  154 |         homePage, productPage
  155 |     }) => {
  156 |         await homePage.productNames.first().click();
  157 |         await productPage.clickAddToCart();
  158 | 
  159 |         const cartBadge = homePage.page.locator('[data-test="cart-quantity"]');
  160 |         await expect(cartBadge).toHaveText('1');
  161 |     });
  162 | 
  163 |     // ─────────────────────────────────────────────────────────────────────────
  164 |     // NEGATIVE / VALIDATION TESTS
  165 |     // ─────────────────────────────────────────────────────────────────────────
  166 | 
  167 |     /**
  168 |      * TC11_Neg – Confirm button stays disabled when no payment method is selected.
  169 |      * The site renders the button with disabled="", so clicking is not possible
  170 |      * by design. We assert the disabled state directly.
  171 |      */
  172 |     test('TC11_Neg - Confirm button is disabled when no payment method selected', async ({
  173 |         homePage, productPage, checkoutPage
  174 |     }) => {
  175 |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  176 |         await checkoutPage.continueAsGuest();
  177 |         await checkoutPage.clickElement(checkoutPage.proceedStep2);
  178 |         await checkoutPage.fillAddress(address);
  179 |         await checkoutPage.clickElement(checkoutPage.proceedStep3);
  180 | 
  181 |         // No payment selected — button must be disabled
  182 |         await expect(checkoutPage.finishButton).toBeDisabled();
  183 |     });
  184 | 
  185 |     // ─────────────────────────────────────────────────────────────────────────
  186 | 
  187 |     /**
  188 |      * TC11b_Neg – Selecting a payment method enables the Confirm button.
  189 |      * Companion to TC11_Neg — confirms the enabled state after selection.
  190 |      */
  191 |     test('TC11b_Neg - Confirm button enables after selecting payment method', async ({
  192 |         homePage, productPage, checkoutPage
  193 |     }) => {
  194 |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  195 |         await checkoutPage.continueAsGuest();
  196 |         await checkoutPage.clickElement(checkoutPage.proceedStep2);
  197 |         await checkoutPage.fillAddress(address);
  198 |         await checkoutPage.clickElement(checkoutPage.proceedStep3);
  199 | 
  200 |         await expect(checkoutPage.finishButton).toBeDisabled();
  201 | 
  202 |         await checkoutPage.paymentMethodSelect.selectOption('cash-on-delivery');
  203 |         await checkoutPage.paymentMethodSelect.dispatchEvent('change');
  204 | 
  205 |         await expect(checkoutPage.finishButton).toBeEnabled({ timeout: 10_000 });
  206 |     });
  207 | 
  208 |     // ─────────────────────────────────────────────────────────────────────────
  209 | 
  210 |     /**
  211 |      * TC12_Neg – Guest form shows all three required-field errors when empty.
  212 |      */
  213 |     test('TC12_Neg - Guest form shows all required field errors when empty', async ({
  214 |         homePage, productPage, checkoutPage
  215 |     }) => {
  216 |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  217 |         await checkoutPage.clickElement(checkoutPage.guestTab);
  218 | 
  219 |         // Submit without filling anything
  220 |         await checkoutPage.clickElement(checkoutPage.guestSubmitButton);
  221 | 
  222 |         await expect(checkoutPage.emailRequiredError).toBeVisible();
  223 |         await expect(checkoutPage.firstNameRequiredError).toBeVisible();
```