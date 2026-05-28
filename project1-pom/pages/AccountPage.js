// @ts-check
import { BasePage } from './BasePage.js';

export class AccountPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        // ── Top-Nav Menu ──────────────────────────────────────────────────────
        this.navMenu       = page.getByTestId('nav-menu');
        this.myAccountLink = page.getByTestId('nav-my-account');

        // ── Account Sidebar / Navigation ──────────────────────────────────────
        this.invoicesNav   = page.getByTestId('nav-invoices');

        // ── Invoice List Page ─────────────────────────────────────────────────
        // Each <tr> in the table body is one invoice record
        this.invoiceRows        = page.locator('table tbody tr');
        // The "Details" button for the FIRST invoice in the list
        this.detailsButton      = page.locator('a.btn-primary:has-text("Details")').first();
        // All "Details" buttons — used to count or iterate invoices
        this.allDetailsButtons  = page.locator('a.btn-primary:has-text("Details")');

        // ── Invoice Detail Page ───────────────────────────────────────────────
        // The PDF download button — data-test="download-invoice"
        this.downloadPdfButton  = page.getByTestId('download-invoice');
        // Any cell that contains an INV- prefixed ID
        this.invoiceIdCell      = page.locator('td').filter({ hasText: /^INV-/ }).first();
    }

    // ── Navigation Helpers ────────────────────────────────────────────────────

    /**
     * Full flow: open user menu → My Account → Invoices
     */
    async navigateToInvoices() {
        await this.navMenu.click();
        await this.myAccountLink.click();
        await this.invoicesNav.click();
    }

    /**
     * Opens the detail page for the first invoice in the list
     */
    async openFirstInvoiceDetails() {
        await this.detailsButton.click();
    }

    /**
     * Returns the count of invoice rows currently visible in the table
     * @returns {Promise<number>}
     */
    async getInvoiceCount() {
        return await this.invoiceRows.count();
    }

    /**
     * Returns text of the INV- cell from the first invoice row
     * @returns {Promise<string|null>}
     */
    async getFirstInvoiceId() {
        return await this.invoiceIdCell.textContent();
    }
}