# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-auth.spec.js >> Service 1 - Authentication >> TC - Login: Empty fields
- Location: project1-pom\tests\01-auth.spec.js:14:13

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('login-error')

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
  - generic [ref=e51]:
    - heading "Login" [level=3] [ref=e52]
    - button "Sign in with Google" [ref=e54] [cursor=pointer]
    - generic "Alternative login methods" [ref=e55]: or use
    - generic [ref=e56]:
      - generic [ref=e57]:
        - generic [ref=e58]: Email address *
        - textbox "Email address *" [ref=e59]:
          - /placeholder: Your email
      - generic [ref=e61]: Email is required
      - generic [ref=e62]:
        - generic [ref=e63]: Password *
        - generic [ref=e65]:
          - textbox "Password *" [ref=e66]:
            - /placeholder: Your password
          - button [ref=e68] [cursor=pointer]:
            - img [ref=e70]
      - generic [ref=e73]: Password is required
      - button "Login" [active] [ref=e75] [cursor=pointer]
    - paragraph [ref=e77]:
      - text: Not yet an account?
      - link "Register your account" [ref=e78] [cursor=pointer]:
        - /url: /auth/register
      - link "Forgot your Password?" [ref=e79] [cursor=pointer]:
        - /url: /auth/forgot-password
  - paragraph [ref=e82]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e83] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. |
    - link "Privacy Policy" [ref=e84] [cursor=pointer]:
      - /url: /privacy
    - text: "| Banner photo by"
    - link "Barn Images" [ref=e85] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e86] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e88] [cursor=pointer]:
    - img [ref=e89]
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
     |                                        ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  33 |     }
  34 | }
```