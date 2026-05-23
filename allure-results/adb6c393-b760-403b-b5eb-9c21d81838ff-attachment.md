# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-auth.spec.js >> Service 1 - Authentication >> TC - Login: Valid credentials
- Location: project1-pom\tests\01-auth.spec.js:14:13

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*account/
Received string:  "https://practicesoftwaretesting.com/admin/dashboard"
Timeout: 5000ms

Call log:
  - Expect "soft toHaveURL" with timeout 5000ms
    4 × unexpected value "https://practicesoftwaretesting.com/auth/login"
    - waiting for" https://practicesoftwaretesting.com/admin/dashboard" navigation to finish...
    - navigated to "https://practicesoftwaretesting.com/admin/dashboard"
    5 × unexpected value "https://practicesoftwaretesting.com/admin/dashboard"

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
    - menuitem "John Doe":
      - button "John Doe"
  - button "Select language": EN
- heading "Sales over the years" [level=1]
- heading "Latest orders" [level=2]
- text: No recent invoices.
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
  1  | // @ts-check
  2  | // Notice we import 'test' and 'expect' from our custom fixture, NOT directly from playwright
  3  | import { test, expect } from '../fixtures/index.js';
  4  | 
  5  | // Import our JSON data
  6  | import loginData from '../data/users.json' with { type: 'json' };
  7  | 
  8  | test.describe('Service 1 - Authentication', () => {
  9  | 
  10 |     // Instructor Concept: Iterating over JSON data
  11 |     loginData.forEach((scenario) => {
  12 |         
  13 |         // Instructor Concept: Custom Fixture injection ({ loginPage })
  14 |         test(`TC - Login: ${scenario.testName}`, async ({ loginPage, preparedPage }) => {
  15 |             
  16 |             await test.step(`Attempt login with email: ${scenario.email}`, async () => {
  17 |                 await loginPage.login(scenario.email, scenario.password);
  18 |             });
  19 | 
  20 |             await test.step('Validate outcome', async () => {
  21 |                 if (scenario.expectSuccess) {
  22 |                     // Soft assertion
> 23 |                     await expect.soft(preparedPage).toHaveURL(/.*account/);
     |                                                     ^ Error: expect(page).toHaveURL(expected) failed
  24 |                 } else {
  25 |                     const actualError = await loginPage.getErrorText();
  26 |                     expect(actualError).toContain(scenario.errorMsg);
  27 |                 }
  28 |             });
  29 |             
  30 |         });
  31 |     });
  32 | });
```