
import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage.js';

// ── Test data ─────────────────────────────────────────────────────────────────
const MSG_49_CHARS = 'A'.repeat(49);
const MSG_50_CHARS = 'A'.repeat(50);
const MSG_VALID    = 'Hello, I need help with my recent order. Could you please assist me with the invoice details?';
const MSG_SPECIAL  = '!@#$%^&*() Hello <World> "test" \'quoted\' -- edge case for contact form submission test!!';

// ── Subject option VALUES ─────────────────────────────────────────────────────
const SUBJECTS = {
    customerService: 'customer-service',
    webmaster:       'webmaster',
    return:          'return',
};

// ─────────────────────────────────────────────────────────────────────────────
test.describe('Service 07 — Customer Support / Messaging Suite', () => {

    let contactPage;

    // Because of Global Setup, the browser is ALREADY logged in before this runs.
    // All we need to do is go straight to the contact page for each test.
    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        await page.goto('/contact');
        await page.waitForLoadState('networkidle');
    });

    test('TC_07_01 — Contact page loads and URL is correct', async ({ page }) => {
        await expect(page).toHaveURL(/\/contact/);
    });

    test('TC_07_02 — All core form fields are visible on the contact page', async () => {
        await expect(contactPage.subjectDropdown).toBeVisible();
        await expect(contactPage.messageInput).toBeVisible();
        await expect(contactPage.attachmentInput).toBeVisible();
        await expect(contactPage.submitButton).toBeVisible();
    });

    test('TC_07_03 — Nav menu confirms user is logged in before submitting', async ({ page }) => {
        const navMenu = page.getByTestId('nav-menu');
        await expect(navMenu).toBeVisible();
        const menuText = await navMenu.textContent();
        expect(menuText?.trim().length).toBeGreaterThan(0);
    });

    test('TC_07_04 — Subject dropdown exposes at least 2 selectable options', async () => {
        const options = await contactPage.getSubjectOptions();
        const filled  = options.filter(o => o.trim().length > 0);
        expect(filled.length).toBeGreaterThanOrEqual(2);
    });

    test('TC_07_05 — Submit button is enabled and ready to click', async () => {
        await expect(contactPage.submitButton).toBeEnabled();
    });

    // FIXED: Now looks for the "Message is required" error directly
    test('TC_07_06 — Submitting with an empty message shows a validation error', async ({ page }) => {
        await contactPage.subjectDropdown.selectOption({ index: 1 });
        await contactPage.submitButton.click();
        await expect(page.getByText('Message is required', { exact: false })).toBeVisible();
    });

    test('TC_07_07 — Message with 49 characters (min − 1) triggers min-length error', async () => {
        await contactPage.subjectDropdown.selectOption({ index: 1 });
        await contactPage.messageInput.fill(MSG_49_CHARS);
        await contactPage.submitButton.click();
        await expect(contactPage.charError).toBeVisible();
    });

    test('TC_07_08 — Message with exactly 50 characters (boundary) submits successfully', async () => {
        await contactPage.submitContactForm(SUBJECTS.customerService, MSG_50_CHARS);
        await expect(contactPage.successAlert).toBeVisible({ timeout: 10_000 });
    });

    test('TC_07_09 — Valid contact form submission displays the success alert', async () => {
        await contactPage.submitContactForm(SUBJECTS.customerService, MSG_VALID);
        await expect(contactPage.successAlert).toBeVisible({ timeout: 10_000 });
    });

    test('TC_07_10 — Success alert contains the expected confirmation message', async () => {
        await contactPage.submitContactForm(SUBJECTS.customerService, MSG_VALID);
        await expect(contactPage.successAlert).toContainText('Thanks for your message', { timeout: 10_000 });
    });

    test('TC_07_11 — Subject "customer-service" submits correctly', async () => {
        await contactPage.submitContactForm(SUBJECTS.customerService, MSG_VALID);
        await expect(contactPage.successAlert).toBeVisible({ timeout: 10_000 });
    });

    test('TC_07_12 — Subject "webmaster" submits correctly', async () => {
        await contactPage.submitContactForm(SUBJECTS.webmaster, MSG_VALID);
        await expect(contactPage.successAlert).toBeVisible({ timeout: 10_000 });
    });

    test('TC_07_13 — Subject "return" submits correctly', async () => {
        await contactPage.submitContactForm(SUBJECTS.return, MSG_VALID);
        await expect(contactPage.successAlert).toBeVisible({ timeout: 10_000 });
    });

    // ── TC_07_14: Attachment upload with valid .txt file ──────────────────────
    test('TC_07_14 — Contact form submits successfully with a 0kb .txt file attachment', async ({ page }) => {
        const filePayload = {
            name:     'support-ticket.txt',
            mimeType: 'text/plain',
            // Passing an empty string creates exactly what the app wants: a 0kb file!
            buffer:   Buffer.from(''), 
        };
        
        await contactPage.submitContactFormWithAttachment(SUBJECTS.webmaster, MSG_VALID, filePayload);
        await expect(contactPage.successAlert).toBeVisible({ timeout: 10_000 });
    });

    test('TC_07_15 — Message field accepts special characters and form submits successfully', async () => {
        await contactPage.submitContactForm(SUBJECTS.webmaster, MSG_SPECIAL);
        await expect(contactPage.successAlert).toBeVisible({ timeout: 10_000 });
    });

});