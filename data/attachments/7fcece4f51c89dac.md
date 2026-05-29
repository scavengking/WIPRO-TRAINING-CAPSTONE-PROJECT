# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-auth.spec.js >> Service 1 - Authentication >> TC - Login: Invalid password
- Location: tests\01-auth.spec.js:14:13

# Error details

```
Error: locator.textContent: Target page, context or browser has been closed
Call log:
  - waiting for getByTestId('login-error')

```

# Test source

```ts
  1  | // @ts-check
  2  | import { BasePage } from './BasePage.js';
  3  | 
  4  | export class LoginPage extends BasePage {
  5  |     /**
  6  |      * @param {import('@playwright/test').Page} page
  7  |      */
  8  |     constructor(page) {
  9  |         super(page);
  10 |         // Semantic locators mapping to practicesoftwaretesting.com
  11 |         this.emailInput = page.getByPlaceholder('Your email');
  12 |         this.passwordInput = page.getByPlaceholder('Your password');
  13 |         this.loginButton = page.getByRole('button', { name: 'Login' });
  14 |         this.errorMessage = page.getByTestId('login-error'); // Example fallback
  15 |     }
  16 | 
  17 |     async goTo() {
  18 |         await this.navigate('/auth/login');
  19 |     }
  20 | 
  21 |     /**
  22 |      * @param {string} email
  23 |      * @param {string} password
  24 |      */
  25 |     async login(email, password) {
  26 |         await this.fillInput(this.emailInput, email);
  27 |         await this.fillInput(this.passwordInput, password);
  28 |         await this.clickElement(this.loginButton);
  29 |     }
  30 | 
  31 |     async getErrorText() {
> 32 |         return await this.errorMessage.textContent();
     |                                        ^ Error: locator.textContent: Target page, context or browser has been closed
  33 |     }
  34 | }
```