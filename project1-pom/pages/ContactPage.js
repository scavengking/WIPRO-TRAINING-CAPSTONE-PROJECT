// @ts-check
import { BasePage } from './BasePage.js';

export class ContactPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        // ── Auto-filled fields (pre-populated when user is logged in) ─────────
        this.firstNameInput  = page.getByTestId('first-name');
        this.lastNameInput   = page.getByTestId('last-name');
        this.emailInput      = page.getByTestId('email');

        // ── Nav Link to Contact Page ──────────────────────────────────────────
        // IMPORTANT: Direct page.goto('/contact') is unreliable on this Angular SPA.
        // Always navigate via the nav link as the codegen confirms.
        this.navContactLink  = page.getByTestId('nav-contact');

        // ── Core Form Inputs ──────────────────────────────────────────────────
        this.subjectDropdown = page.getByTestId('subject');
        this.messageInput    = page.getByTestId('message');
        this.attachmentInput = page.getByTestId('attachment');
        this.submitButton    = page.getByTestId('contact-submit');

        // ── Feedback Locators ─────────────────────────────────────────────────
        this.successAlert = page.locator('.alert-success');
        this.charError    = page.getByText('Message must be minimal 50 characters', { exact: false });
    }

    /**
     * Navigate to contact page by clicking the nav link (required for Angular SPA routing).
     * Codegen confirmed: direct page.goto('/contact') skips Angular route guard init.
     */
    async goTo() {
        await this.navContactLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Submit form with subject and message (name/email are auto-filled when logged in)
     * @param {string} subject
     * @param {string} message
     */
    async submitContactForm(subject, message) {
        await this.subjectDropdown.selectOption(subject);
        await this.messageInput.fill(message);
        await this.submitButton.click();
    }

    /**
     * Submit form with a .txt file attachment
     * @param {string} subject
     * @param {string} message
     * @param {{ name: string, mimeType: string, buffer: Buffer }} filePayload
     */
    async submitContactFormWithAttachment(subject, message, filePayload) {
        await this.subjectDropdown.selectOption(subject);
        await this.messageInput.fill(message);
        await this.attachmentInput.setInputFiles(filePayload);
        await this.submitButton.click();
    }

    /**
     * Gets all available option values from the subject dropdown
     * @returns {Promise<string[]>}
     */
    async getSubjectOptions() {
        return await this.subjectDropdown.locator('option').allTextContents();
    }

    /**
     * Gets the current value of the first-name field (to verify auto-fill)
     * @returns {Promise<string>}
     */
    async getAutoFilledFirstName() {
        return await this.firstNameInput.inputValue();
    }

    /**
     * Gets the current value of the email field (to verify auto-fill)
     * @returns {Promise<string>}
     */
    async getAutoFilledEmail() {
        return await this.emailInput.inputValue();
    }
}