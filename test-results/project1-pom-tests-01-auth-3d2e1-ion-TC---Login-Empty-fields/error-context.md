# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: project1-pom\tests\01-auth.spec.js >> Service 1 - Authentication >> TC - Login: Empty fields
- Location: project1-pom\tests\01-auth.spec.js:14:13

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1  | // @ts-check
  2  | import { test as baseTest, expect } from '@playwright/test';
  3  | import { LoginPage } from '../pages/LoginPage.js';
  4  | 
  5  | /**
  6  |  * @typedef {object} MyFixtures
  7  |  * @property {import('@playwright/test').Page} preparedPage
  8  |  * @property {LoginPage} loginPage
  9  |  */
  10 | 
  11 | /** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & MyFixtures, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>} */
  12 | export const test = baseTest.extend({
  13 |     
  14 |     // 1. Instructor Concept: Custom preparedPage fixture
  15 |     preparedPage: async ({ page }, use) => {
  16 |         // Go to the base URL automatically
> 17 |         await page.goto('/');
     |                    ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  18 |         
  19 |         // Imagine handling a generic popup here if the site had one
  20 |         // await page.getByRole('button', { name: 'Accept Cookies' }).click();
  21 |         
  22 |         // Pass the ready page to the test
  23 |         await use(page);
  24 |     },
  25 | 
  26 |     // 2. We can even create a fixture specifically for the LoginPage
  27 |     loginPage: async ({ preparedPage }, use) => {
  28 |         const loginPage = new LoginPage(preparedPage);
  29 |         await loginPage.goTo();
  30 |         
  31 |         // Pass the instantiated POM to the test
  32 |         await use(loginPage);
  33 |     }
  34 | });
  35 | 
  36 | // Export expect so we only need to import from this fixture file in our tests
  37 | export { expect };
```