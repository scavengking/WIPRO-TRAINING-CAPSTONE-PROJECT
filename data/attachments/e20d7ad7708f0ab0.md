# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-auth.spec.js >> Service 1 - Authentication >> TC - Login: Valid credentials
- Location: tests\01-auth.spec.js:14:13

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*account/
Received string:  "https://practicesoftwaretesting.com/admin/dashboard"
Timeout: 5000ms

Call log:
  - Expect "soft toHaveURL" with timeout 5000ms
    3 × unexpected value "https://practicesoftwaretesting.com/auth/login"
    - waiting for" https://practicesoftwaretesting.com/admin/dashboard" navigation to finish...
    - navigated to "https://practicesoftwaretesting.com/admin/dashboard"
    7 × unexpected value "https://practicesoftwaretesting.com/admin/dashboard"

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
- table:
  - rowgroup:
    - row "Invoice Number Billing Address Invoice Date Status Total":
      - columnheader "Invoice Number"
      - columnheader "Billing Address"
      - columnheader "Invoice Date"
      - columnheader "Status"
      - columnheader "Total"
      - columnheader
  - rowgroup:
    - row "INV-20260000018 Test street 19 2026-05-17 09:00:22 SHIPPED $855.58 Edit":
      - cell "INV-20260000018"
      - cell "Test street 19"
      - cell "2026-05-17 09:00:22"
      - cell "SHIPPED"
      - cell "$855.58"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WHF9JJ9FJ5KD9V7WXXG
    - row "INV-20260000016 Test street 17 2026-04-29 09:00:22 SHIPPED $131.91 Edit":
      - cell "INV-20260000016"
      - cell "Test street 17"
      - cell "2026-04-29 09:00:22"
      - cell "SHIPPED"
      - cell "$131.91"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WGTER3G4NT8MXS6HSHR
    - row "INV-20260000017 Test street 18 2026-04-29 09:00:22 SHIPPED $3.95 Edit":
      - cell "INV-20260000017"
      - cell "Test street 18"
      - cell "2026-04-29 09:00:22"
      - cell "SHIPPED"
      - cell "$3.95"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WH6G0ZM8NC51SPQJ3VE
    - row "INV-20260000015 Test street 16 2026-04-23 09:00:22 SHIPPED $18.34 Edit":
      - cell "INV-20260000015"
      - cell "Test street 16"
      - cell "2026-04-23 09:00:22"
      - cell "SHIPPED"
      - cell "$18.34"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WGJK7MSZJSXTXRDTRGT
    - row "INV-20260000014 Test street 15 2026-04-20 09:00:22 ON_HOLD $227.67 Edit":
      - cell "INV-20260000014"
      - cell "Test street 15"
      - cell "2026-04-20 09:00:22"
      - cell "ON_HOLD"
      - cell "$227.67"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WGAVMWXPS67ESK70TA2
    - row "INV-20260000013 Test street 14 2026-04-14 09:00:22 SHIPPED $22.96 Edit":
      - cell "INV-20260000013"
      - cell "Test street 14"
      - cell "2026-04-14 09:00:22"
      - cell "SHIPPED"
      - cell "$22.96"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WG4NPRJRZ1KPEDH6TJ7
    - row "INV-20260000012 Test street 13 2026-04-05 09:00:22 SHIPPED $39.42 Edit":
      - cell "INV-20260000012"
      - cell "Test street 13"
      - cell "2026-04-05 09:00:22"
      - cell "SHIPPED"
      - cell "$39.42"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WFYXECGFBNYQ3MJP0C5
    - row "INV-20260000011 Test street 12 2026-04-01 09:00:22 SHIPPED $113.73 Edit":
      - cell "INV-20260000011"
      - cell "Test street 12"
      - cell "2026-04-01 09:00:22"
      - cell "SHIPPED"
      - cell "$113.73"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WFKE3MAZP5PHN7GVBF2
    - row "INV-20260000009 Test street 10 2026-03-18 09:00:22 ON_HOLD $886.43 Edit":
      - cell "INV-20260000009"
      - cell "Test street 10"
      - cell "2026-03-18 09:00:22"
      - cell "ON_HOLD"
      - cell "$886.43"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WF20BGF46ZKN57S299C
    - row "INV-20260000010 Test street 11 2026-03-18 09:00:22 SHIPPED $36.54 Edit":
      - cell "INV-20260000010"
      - cell "Test street 11"
      - cell "2026-03-18 09:00:22"
      - cell "SHIPPED"
      - cell "$36.54"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WFCS9Y2G1GJYFJMN4RZ
    - row "INV-20260000008 Test street 9 2026-03-09 09:00:22 SHIPPED $314.87 Edit":
      - cell "INV-20260000008"
      - cell "Test street 9"
      - cell "2026-03-09 09:00:22"
      - cell "SHIPPED"
      - cell "$314.87"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WEQ2QS0K8Q60HNTB7YJ
    - row "INV-20260000007 Test street 8 2026-02-23 09:00:22 SHIPPED $550.92 Edit":
      - cell "INV-20260000007"
      - cell "Test street 8"
      - cell "2026-02-23 09:00:22"
      - cell "SHIPPED"
      - cell "$550.92"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WEB2SFNQ6RS9W4T0RH0
    - row "INV-20260000006 Test street 7 2026-02-18 09:00:22 SHIPPED $1258.31 Edit":
      - cell "INV-20260000006"
      - cell "Test street 7"
      - cell "2026-02-18 09:00:22"
      - cell "SHIPPED"
      - cell "$1258.31"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WDZ4DBPW9J62G34R11G
    - row "INV-20260000005 Test street 6 2026-02-12 09:00:22 SHIPPED $851.59 Edit":
      - cell "INV-20260000005"
      - cell "Test street 6"
      - cell "2026-02-12 09:00:22"
      - cell "SHIPPED"
      - cell "$851.59"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WDJZ48P7JQC165VY5QY
    - row "INV-20260000004 Test street 5 2026-01-23 09:00:22 ON_HOLD $281.13 Edit":
      - cell "INV-20260000004"
      - cell "Test street 5"
      - cell "2026-01-23 09:00:22"
      - cell "ON_HOLD"
      - cell "$281.13"
      - cell "Edit":
        - link "Edit":
          - /url: /admin/orders/edit/01KSA10WD6Q9DFAP96M7KJVSQR
- navigation:
  - list:
    - listitem:
      - button "Previous"
    - listitem:
      - button "Page-1": "1"
    - listitem:
      - button "Page-2": "2"
    - listitem:
      - button "Page-3": "3"
    - listitem:
      - button "Page-4": "4"
    - listitem:
      - button "Page-5": "5"
    - listitem:
      - button "Page-6": "6"
    - listitem:
      - button "Page-7": "7"
    - listitem:
      - button "Page-8": "8"
    - listitem:
      - button "Page-9": "9"
    - listitem:
      - button "Page-10": "10"
    - listitem:
      - button "Page-11": "11"
    - listitem:
      - button "Page-12": "12"
    - listitem:
      - button "Page-13": "13"
    - listitem:
      - button "Page-14": "14"
    - listitem:
      - button "Next"
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