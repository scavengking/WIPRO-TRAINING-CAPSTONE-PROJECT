# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-auth.spec.js >> Service 1 - Authentication >> TC - Login: Invalid password
- Location: tests\01-auth.spec.js:14:13

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('email') to be visible

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
      - generic [ref=e60]:
        - generic [ref=e61]: Password *
        - generic [ref=e63]:
          - textbox "Password *" [ref=e64]:
            - /placeholder: Your password
          - button [ref=e66] [cursor=pointer]:
            - img [ref=e68]
      - button "Login" [ref=e71] [cursor=pointer]
    - paragraph [ref=e73]:
      - text: Not yet an account?
      - link "Register your account" [ref=e74] [cursor=pointer]:
        - /url: /auth/register
      - link "Forgot your Password?" [ref=e75] [cursor=pointer]:
        - /url: /auth/forgot-password
  - paragraph [ref=e78]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e79] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. |
    - link "Privacy Policy" [ref=e80] [cursor=pointer]:
      - /url: /privacy
    - text: "| Banner photo by"
    - link "Barn Images" [ref=e81] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e82] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e84] [cursor=pointer]:
    - img [ref=e85]
```

# Test source

```ts
  1  | // @ts-check
  2  | import { expect } from '@playwright/test';
  3  | 
  4  | export class BasePage {
  5  |     /**
  6  |      * @param {import('@playwright/test').Page} page
  7  |      */
  8  |     constructor(page) {
  9  |         this.page = page;
  10 |     }
  11 | 
  12 |     /**
  13 |      * @param {string} path
  14 |      */
  15 |     async navigate(path) {
  16 |         await this.page.goto(path);
  17 |     }
  18 | 
  19 |     /**
  20 |      * A reusable method to wait for an element and click it
  21 |      * @param {import('@playwright/test').Locator} locator
  22 |      */
  23 |     async clickElement(locator) {
  24 |         await locator.waitFor({ state: 'visible' });
  25 |         await locator.click();
  26 |     }
  27 | 
  28 |     /**
  29 |      * A reusable method to fill inputs cleanly
  30 |      * @param {import('@playwright/test').Locator} locator
  31 |      * @param {string} text
  32 |      */
  33 |     async fillInput(locator, text) {
> 34 |         await locator.waitFor({ state: 'visible' });
     |                       ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  35 |         await locator.fill(text);
  36 |     }
  37 | }
```