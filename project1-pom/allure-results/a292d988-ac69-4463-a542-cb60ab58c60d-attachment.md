# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-auth.spec.js >> Service 1 - Authentication >> TC - Login: Empty fields
- Location: tests\01-auth.spec.js:14:13

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('E-mail is required')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('E-mail is required')

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
  - button "Select language": EN
- heading "Login" [level=3]
- button "Sign in with Google"
- text: or use Email address *
- textbox "Email address *":
  - /placeholder: Your email
- text: Email is required Password *
- textbox "Password *":
  - /placeholder: Your password
- button
- text: Password is required
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
  1  | 
  2  | import { expect } from '../fixtures/index.js';
  3  | import { BasePage } from './BasePage.js';
  4  | 
  5  | export class LoginPage extends BasePage {
  6  |     /**
  7  |      * @param {import('@playwright/test').Page} page
  8  |      */
  9  |     constructor(page) {
  10 |         super(page);
  11 |         // Semantic locators mapping to practicesoftwaretesting.com
  12 |         // this.emailInput = page.getByPlaceholder('Your email');
  13 |         // this.passwordInput = page.getByPlaceholder('Your password');
  14 |         // this.loginButton = page.getByRole('button', { name: 'Login' });
  15 |         // this.errorMessage = page.locator('.alert, .help-block, [data-test="login-error"]'); // Example fallback
  16 |         // Using the exact data-test attributes you found in the HTML!
  17 |         this.emailInput = page.getByTestId('email');
  18 |         
  19 |         // Assuming the password field follows the exact same pattern
  20 |         this.passwordInput = page.getByTestId('password'); 
  21 |         
  22 |         // Using the submit button's data-test attribute
  23 |         this.loginButton = page.getByTestId('login-submit');
  24 |         
  25 |         // The standard error locator we updated earlier
  26 |         this.errorMessage = page.locator('.alert, .help-block, [data-test="login-error"]');
  27 |     }
  28 | 
  29 |     async goTo() {
  30 |         await this.navigate('/auth/login');
  31 |     }
  32 | 
  33 |     /**
  34 |      * @param {string} email
  35 |      * @param {string} password
  36 |      */
  37 |     async login(email, password) {
  38 |         await this.fillInput(this.emailInput, email);
  39 |         await this.fillInput(this.passwordInput, password);
  40 |         await this.clickElement(this.loginButton);
  41 |     }
  42 | 
  43 |     /**
  44 |      * @param {string} expectedText
  45 |      */
  46 |     async expectErrorToBeVisible(expectedText) {
  47 |         const errorElement = this.page.getByText(expectedText);
> 48 |         await expect(errorElement).toBeVisible();
     |                                    ^ Error: expect(locator).toBeVisible() failed
  49 |     }
  50 | }
```