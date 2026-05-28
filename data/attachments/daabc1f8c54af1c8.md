# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-checkout.spec.js >> Service 6 - Checkout Suite (Logged-In) >> TC15_Pos - Logged-in user sees correct message at Step 2
- Location: tests/05-checkout.spec.js:160:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('already logged in')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('already logged in')

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
- tablist:
  - listitem:
    - tab "Sign in"
  - listitem:
    - tab "Continue as Guest"
- tabpanel:
  - heading "Login" [level=3]
  - text: Email address *
  - textbox "Email address *":
    - /placeholder: Your email
  - text: Password *
  - textbox "Password *":
    - /placeholder: Your password
  - button "Login"
  - paragraph:
    - text: Not yet an account?
    - link "Register your account":
      - /url: /auth/register
    - link "Forgot your Password?":
      - /url: /auth/forgot-password
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
  66  |         await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
  67  |     });
  68  | 
  69  |     test('TC20_Neg - Bank transfer requires numeric account number', async ({
  70  |         homePage, productPage, checkoutPage
  71  |     }) => {
  72  |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  73  |         
  74  |         await checkoutPage.continueAsGuest();
  75  |         await checkoutPage.clickElement(checkoutPage.proceedStep2);
  76  |         await checkoutPage.fillAddress(address);
  77  |         await checkoutPage.clickElement(checkoutPage.proceedStep3);
  78  | 
  79  |         await checkoutPage.paymentMethodSelect.selectOption('bank-transfer');
  80  |         await checkoutPage.paymentMethodSelect.dispatchEvent('change');
  81  | 
  82  |         // Pass invalid alphabetical characters into the account number field
  83  |         await checkoutPage.fillBankDetails('Global Test Bank', 'John Doe', 'ABCDEFGHIJ');
  84  |         
  85  |         // Trigger Angular's validation by clicking away (blurring) or attempting to submit
  86  |         await checkoutPage.accountNumberInput.blur();
  87  | 
  88  |         // Assert that the specific numeric error message appears
  89  |         await expect(checkoutPage.accountNumberError).toBeVisible();
  90  | 
  91  |         // FIX: Assert that the application correctly prevents submission by disabling the button
  92  |         await expect(checkoutPage.finishButton).toBeDisabled();
  93  |     });
  94  |     
  95  | 
  96  |     test('TC11_Neg - Confirm button is disabled when no payment method selected', async ({
  97  |         homePage, productPage, checkoutPage
  98  |     }) => {
  99  |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  100 |         await checkoutPage.continueAsGuest();
  101 |         await checkoutPage.clickElement(checkoutPage.proceedStep2);
  102 |         await checkoutPage.fillAddress(address);
  103 |         await checkoutPage.clickElement(checkoutPage.proceedStep3);
  104 | 
  105 |         await expect(checkoutPage.finishButton).toBeDisabled();
  106 |     });
  107 | 
  108 |     test('TC12_Neg - Guest form shows all required field errors when empty', async ({
  109 |         homePage, productPage, checkoutPage
  110 |     }) => {
  111 |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  112 |         await checkoutPage.clickElement(checkoutPage.guestTab);
  113 |         await checkoutPage.clickElement(checkoutPage.guestSubmitButton);
  114 | 
  115 |         await expect(checkoutPage.emailRequiredError).toBeVisible();
  116 |         await expect(checkoutPage.firstNameRequiredError).toBeVisible();
  117 |         await expect(checkoutPage.lastNameRequiredError).toBeVisible();
  118 |     });
  119 | 
  120 |     test('TC17_Neg - Guest form requires names when only email is provided', async ({
  121 |         homePage, productPage, checkoutPage
  122 |     }) => {
  123 |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  124 |         await checkoutPage.clickElement(checkoutPage.guestTab);
  125 |         await checkoutPage.fillInput(checkoutPage.guestEmailInput, 'guest@test.com');
  126 |         await checkoutPage.clickElement(checkoutPage.guestSubmitButton);
  127 | 
  128 |         await expect(checkoutPage.firstNameRequiredError).toBeVisible();
  129 |         await expect(checkoutPage.lastNameRequiredError).toBeVisible();
  130 |     });
  131 | });
  132 | 
  133 | // ============================================================================
  134 | // SUITE B: AUTHENTICATED CHECKOUT FLOWS (Logged In)
  135 | // ============================================================================
  136 | test.describe('Service 6 - Checkout Suite (Logged-In)', () => {
  137 | 
  138 |     // No test.use override here! 
  139 |     // Playwright will naturally use the cookie from auth.setup.js.
  140 | 
  141 |     test.beforeEach(async ({ homePage }) => {
  142 |         await homePage.goTo();
  143 |     });
  144 | 
  145 |     test('TC10_Auth - Complete E2E Checkout as Logged-In User', async ({
  146 |         homePage, productPage, checkoutPage
  147 |     }) => {
  148 |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  149 | 
  150 |         // We are already logged in, so we just click proceed on step 2
  151 |         await checkoutPage.clickElement(checkoutPage.proceedStep2);
  152 |         
  153 |         await checkoutPage.fillAddress(address);
  154 |         await checkoutPage.clickElement(checkoutPage.proceedStep3);
  155 |         
  156 |         await checkoutPage.selectPaymentAndConfirm('cash-on-delivery');
  157 |         await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
  158 |     });
  159 | 
  160 |     test('TC15_Pos - Logged-in user sees correct message at Step 2', async ({
  161 |         homePage, productPage, checkoutPage
  162 |     }) => {
  163 |         await addToCartAndProceedStep1(homePage, productPage, checkoutPage);
  164 |         
  165 |         // "Hello <Name>, you are already logged in. You can proceed to checkout."
> 166 |         await expect(checkoutPage.alreadyLoggedInMsg).toBeVisible();
      |                                                       ^ Error: expect(locator).toBeVisible() failed
  167 |     });
  168 | 
  169 |     test('TC16_Pos - Cart badge shows item count after adding product', async ({
  170 |         homePage, productPage
  171 |     }) => {
  172 |         await homePage.productNames.first().click();
  173 |         await productPage.clickAddToCart();
  174 | 
  175 |         const cartBadge = homePage.page.locator('[data-test="cart-quantity"]');
  176 |         await expect(cartBadge).toHaveText('1');
  177 |     });
  178 | });
```