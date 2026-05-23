# Wipro Capstone — Daily Progress Report

**Date:**22 May 2026

# Playwright Framework Setup

## 1. Installation
Used manual install instead of `npm init playwright@latest` for full control over architecture:
```bash
npm install -D @playwright/test dotenv allure-playwright
```

## 2. Project Structure
```text
project/
├── package.json
├── project1-pom/        # Main automation (pages, tests, data, utils, fixtures)
│   └── playwright.config.js
└── project2-svg/        # SVG/graphics testing
```
POM separates locators from test logic, keeping the framework scalable and maintainable.

## 3. Playwright Config Highlights
```js
fullyParallel: true                        // run all tests concurrently
retries: process.env.CI ? 2 : 0           // retries only in CI
trace: 'on-first-retry'
video: 'retain-on-failure'
```
Parallel execution speeds up the suite; saved traces and videos make failures easier to debug.

## 4. Environment Variables
Credentials and URLs live in `.env` (gitignored), loaded via `dotenv.config()`:
```env
BASE_URL=https://testsite.com
ADMIN_EMAIL=admin@test.com
PASSWORD=12345
```
Keeps secrets out of source control and makes environment changes a one-line edit.

## 5. NPM Scripts
```json
"test":          "playwright test"
"test:headed":   "playwright test --headed"
"test:parallel": "playwright test --workers=4"
```
Shorter, standardised commands instead of typing full `npx` flags each time.

---

**TL;DR:** Manual setup → full control. POM → clean separation. Config → parallel + CI-aware. `.env` → secure + flexible. NPM scripts → simple execution.


**Date:**23 May 2026

**Milestone:** Milestone 2 — DOM Navigation, Locators & POM
**Service:** Service 1 — Authentication (`01-auth.spec.js`)
 
---
 
## Summary
 
Completed the core foundation of Milestone 2. The codebase was refactored from a basic procedural script into a scalable, data-driven Page Object Model (POM) architecture. The Authentication test suite (Valid Login, Invalid Credentials, Empty Fields) was fully implemented with a 100% pass rate. Strict TypeScript checking (`// @ts-check`) was also enforced across all JavaScript files.
 
---
 
## Architecture
 
**Page Object Model (POM)**
- `BasePage.js` — handles low-level Playwright interactions (waiting, clicking, filling).
- `LoginPage.js` — stores locators and page-specific methods.
**Data-Driven Testing**
- Test credentials are extracted into `data/users.json`. The spec loops through the JSON array to run multiple scenarios dynamically, eliminating hardcoded values.
**Custom Fixtures (`test.extend`)**
- Setup logic (e.g., `page.goto`) is abstracted into `fixtures/index.js`. Tests automatically receive a `preparedPage` and an initialized `loginPage` object.
---
 
## Technical Challenges and Solutions
 
### 1. Framework Configuration — Execution Context
**Problem:** Running tests from the root workspace caused Playwright to fail, as it could not locate the nested `playwright.config.js` or the Chromium project.
 
**Solution:** Navigate directly into the `project1-pom` directory before executing tests so Playwright correctly resolves its config and environment variables.
 
---
 
### 2. Undocumented Role-Based Redirects
**Problem:** The valid login test failed because the app routed to `/admin/dashboard` instead of the expected `/account`. The test data was using an admin-level account hardcoded in the backend.
 
**Solution:** Updated the URL assertion to use a regex pattern that accepts either path:
```js
await expect.soft(preparedPage).toHaveURL(/.*(account|dashboard)/);
```
 
---
 
### 3. Playwright Test ID Attribute Mismatch
**Problem:** `getByTestId()` timed out because Playwright defaults to looking for `data-testid`, but this application uses `data-test`.
 
**Solution:** Added a single config-level fix in `playwright.config.js`:
```js
testIdAttribute: 'data-test'
```
This corrected all locators globally without rewriting individual selectors.
 
---
 
### 4. Strict Mode Violation — Multiple Matching Elements
**Problem:** On empty-field submission, two error messages appeared simultaneously. Querying by a generic CSS class caused Playwright to throw a strict mode violation: *"resolved to 2 elements"*.
 
**Solution:** Replaced the CSS class-based query with `page.getByText()` inside a custom `expectErrorToBeVisible()` method in the POM. This approach ties directly to the JSON test data and is resilient to DOM structure changes.
 
---
 
### 5. TypeScript Strict Mode — Undefined Property
**Problem:** The Valid Login scenario in `users.json` has no `errorMsg` property. Enabling `// @ts-check` caused VS Code to flag a potential `undefined` type error.
 
**Solution:** Added a fallback in the spec:
```js
scenario.errorMsg || ''
```
This guarantees a string is always passed to the validation method, satisfying the type checker without altering the test data.
 
---
 
## Next Steps
 
1. Map locators for `RegisterPage.js`.
2. Automate the registration flow — checkboxes, radio buttons, and native `<select>` dropdowns.
3. Finalize Service 1 and begin Milestone 3 — Advanced Async UI.