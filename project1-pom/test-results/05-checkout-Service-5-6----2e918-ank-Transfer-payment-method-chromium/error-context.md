# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-checkout.spec.js >> Service 5 & 6 - Checkout Suite >> TC13_Pos - Checkout with Bank Transfer payment method
- Location: tests\05-checkout.spec.js:112:9

# Error details

```
Test timeout of 30000ms exceeded.
```

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

```
Tearing down "context" exceeded the test timeout of 30000ms.
```