// @ts-check
import { test, expect } from '../fixtures/index.js';

// ── Shared Test Data ──────────────────────────────────────────────────────────
const CUSTOMER = {
    email:    process.env.CUSTOMER_EMAIL    ?? 'customer@practicesoftwaretesting.com',
    password: process.env.CUSTOMER_PASSWORD ?? 'welcome01',
};

// ─────────────────────────────────────────────────────────────────────────────
test.describe('Service 08 — Invoices & Account Management', () => {

    // Login once before every test; each test starts from the home page
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.login(CUSTOMER.email, CUSTOMER.password);
        // After login, Playwright lands wherever the app redirects — typically '/'
        await loginPage.page.waitForLoadState('networkidle');
    });

    // ── TC_08_01: User menu is visible after login ────────────────────────────
    test('TC_08_01 — User nav-menu button is visible after successful login', async ({ accountPage }) => {
        await expect(accountPage.navMenu).toBeVisible();
    });

    // ── TC_08_02: Opening user menu reveals "My Account" link ────────────────
    test('TC_08_02 — Clicking user menu reveals the "My account" dropdown link', async ({ accountPage }) => {
        await accountPage.navMenu.click();
        await expect(accountPage.myAccountLink).toBeVisible();
    });

    // ── TC_08_03: "My Account" link navigates to account page ────────────────
    test('TC_08_03 — "My account" link navigates to /account', async ({ accountPage }) => {
        await accountPage.navMenu.click();
        await accountPage.myAccountLink.click();
        await expect(accountPage.page).toHaveURL(/\/account/);
    });

    // ── TC_08_04: Invoices nav link is visible on account page ───────────────
    test('TC_08_04 — Invoices navigation link is visible on the account page', async ({ accountPage }) => {
        await accountPage.navMenu.click();
        await accountPage.myAccountLink.click();
        await expect(accountPage.invoicesNav).toBeVisible();
    });

    // ── TC_08_05: Clicking Invoices navigates to the invoices list ────────────
    test('TC_08_05 — Clicking Invoices navigates to /account/invoices', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        await expect(accountPage.page).toHaveURL(/\/account\/invoices/);
    });

    // ── TC_08_06: Invoice list page URL is exactly /account/invoices ─────────
    test('TC_08_06 — Invoices page URL path matches /account/invoices exactly', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        const url = accountPage.page.url();
        expect(url).toMatch(/\/account\/invoices$/);
    });

    // ── TC_08_07: At least one invoice record is visible ─────────────────────
    test('TC_08_07 — Invoice list displays at least one invoice record', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        const count = await accountPage.getInvoiceCount();
        expect(count).toBeGreaterThanOrEqual(1);
    });

    // ── TC_08_08: Invoice rows show an INV- prefixed ID ───────────────────────
    test('TC_08_08 — First invoice record shows an INV- prefixed invoice ID', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        const id = await accountPage.getFirstInvoiceId();
        expect(id?.trim()).toMatch(/^INV-/);
    });

    // ── TC_08_09: Each invoice row has a "Details" button ────────────────────
    test('TC_08_09 — Every invoice row has a visible "Details" button', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        const rowCount     = await accountPage.getInvoiceCount();
        const buttonCount  = await accountPage.allDetailsButtons.count();
        expect(buttonCount).toBe(rowCount);
    });

    // ── TC_08_10: "Details" button navigates to invoice detail page ───────────
    test('TC_08_10 — Clicking "Details" on the first invoice navigates to its detail page', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        await accountPage.openFirstInvoiceDetails();
        await expect(accountPage.page).toHaveURL(/\/account\/invoices\/.+/);
    });

    // ── TC_08_11: Invoice detail URL contains a non-empty ID segment ──────────
    test('TC_08_11 — Invoice detail page URL contains a non-empty invoice ID segment', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        await accountPage.openFirstInvoiceDetails();
        const url = accountPage.page.url();
        // URL format: /account/invoices/<ULID>
        const segments = url.split('/');
        const idSegment = segments[segments.length - 1];
        expect(idSegment.length).toBeGreaterThan(0);
    });

    // ── TC_08_12: Invoice detail page shows an INV- reference ────────────────
    test('TC_08_12 — Invoice detail page displays an INV- prefixed reference', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        await accountPage.openFirstInvoiceDetails();
        await expect(accountPage.invoiceIdCell).toBeVisible({ timeout: 8000 });
        const id = await accountPage.invoiceIdCell.textContent();
        expect(id?.trim()).toMatch(/^INV-/);
    });

    // ── TC_08_13: "Download PDF" button is visible on detail page ────────────
    test('TC_08_13 — "Download PDF" button is visible on the invoice detail page', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        await accountPage.openFirstInvoiceDetails();
        await expect(accountPage.downloadPdfButton).toBeVisible({ timeout: 8000 });
    });

    // ── TC_08_14: "Download PDF" button text is correct ──────────────────────
    test('TC_08_14 — "Download PDF" button displays the correct label text', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        await accountPage.openFirstInvoiceDetails();
        await expect(accountPage.downloadPdfButton).toContainText('Download', { timeout: 8000 });
    });

    // ── TC_08_15: "Download PDF" initiates a file download ───────────────────
    test('TC_08_15 — Clicking "Download PDF" initiates a PDF file download', async ({ accountPage }) => {
        await accountPage.navigateToInvoices();
        await accountPage.openFirstInvoiceDetails();

        // Playwright's download event listener must be registered BEFORE the click
        const [download] = await Promise.all([
            accountPage.page.waitForEvent('download', { timeout: 15000 }),
            accountPage.downloadPdfButton.click(),
        ]);

        // Verify a download was triggered and the filename looks like a PDF
        expect(download.suggestedFilename()).toMatch(/\.(pdf)$/i);
    });

});