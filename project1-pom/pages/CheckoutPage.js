import { BasePage } from './BasePage.js';
import { expect }   from '@playwright/test';

export class CheckoutPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        // ── Navigation ───────────────────────────────────────────────────────
        this.navCart   = page.getByRole('link', { name: 'cart' });
        // data-test="nav-sign-in" does NOT exist — use role locator
        this.navSignIn = page.getByRole('link', { name: 'Sign in' });

        // ── Checkout Step Buttons ────────────────────────────────────────────
        this.proceedStep1 = page.getByTestId('proceed-1');
        // data-test="proceed-2" does NOT exist on site — use role + .last()
        this.proceedStep2 = page.getByRole('button', { name: 'Proceed to checkout' }).last();
        this.proceedStep3 = page.getByTestId('proceed-3');

        // ── Step 2 – Auth State Messages ─────────────────────────────────────
        // Exact text from site: "Hello John Doe, you are already logged in. You can proceed to checkout."
        this.alreadyLoggedInMsg = page.getByText('already logged in', { exact: false });

        // ── Guest Checkout Elements ──────────────────────────────────────────
        this.guestTab            = page.getByRole('tab', { name: 'Continue as Guest' });
        this.guestEmailInput     = page.getByTestId('guest-email');
        this.guestFirstNameInput = page.getByTestId('guest-first-name');
        this.guestLastNameInput  = page.getByTestId('guest-last-name');
        this.guestSubmitButton   = page.getByTestId('guest-submit');
        this.guestConfirmText    = page.getByText('Continuing as guest', { exact: false });

        // ── Address Form Fields ──────────────────────────────────────────────
        this.countrySelect    = page.getByTestId('country');
        this.postalCodeInput  = page.getByTestId('postal_code');
        this.houseNumberInput = page.getByTestId('house_number');
        this.streetInput      = page.getByTestId('street');
        this.cityInput        = page.getByTestId('city');
        this.stateInput       = page.getByTestId('state');

        // ── Payment & Finish ─────────────────────────────────────────────────
        this.paymentMethodSelect = page.getByTestId('payment-method');
        this.finishButton        = page.getByTestId('finish');

        // ── Success Messages ─────────────────────────────────────────────────
        this.paymentSuccessMessage = page.getByTestId('payment-success-message');

        // ── Validation / Error Messages ──────────────────────────────────────
        this.paymentRequiredError   = page.getByText('Payment method is required', { exact: false });
        this.emailRequiredError     = page.getByText('Email is required');
        this.firstNameRequiredError = page.getByText('First name is required');
        this.lastNameRequiredError  = page.getByText('Last name is required');
    }

    // ── Page Actions ─────────────────────────────────────────────────────────

    async goToCart() {
        await this.clickElement(this.navCart);
    }

    /**
     * Fill the billing address form from a data object.
     * @param {{ street: string, city: string, state: string, postalCode: string, houseNumber: string, countryCode: string }} addressData
     */
    async fillAddress(addressData) {
        await this.streetInput.fill(addressData.street);
        await this.cityInput.fill(addressData.city);
        await this.stateInput.fill(addressData.state);
        await this.postalCodeInput.fill(addressData.postalCode);
        await this.houseNumberInput.fill(addressData.houseNumber);
        await this.countrySelect.selectOption(addressData.countryCode);
    }

    /**
     * Complete the "Continue as Guest" tab and submit.
     * @param {{ email?: string, firstName?: string, lastName?: string }} opts
     */
    async continueAsGuest({ email = 'guest@test.com', firstName = 'John', lastName = 'Doe' } = {}) {
        await this.clickElement(this.guestTab);
        await this.fillInput(this.guestEmailInput, email);
        await this.fillInput(this.guestFirstNameInput, firstName);
        await this.fillInput(this.guestLastNameInput, lastName);
        await this.clickElement(this.guestSubmitButton);
    }

    /**
     * Select a payment method and click Confirm.
     *
     * FIX: Angular reactive forms sometimes don't detect Playwright's selectOption alone.
     * We dispatch a native 'change' event after selection and wait for the button to
     * become enabled before clicking — this is the correct Playwright + Angular pattern.
     *
     * @param {string} method - e.g. 'cash-on-delivery', 'bank-transfer'
     */
    async selectPaymentAndConfirm(method = 'cash-on-delivery') {
        await this.paymentMethodSelect.selectOption(method);

        // Dispatch native change event so Angular's reactive form picks up the value
        await this.paymentMethodSelect.dispatchEvent('change');

        // Wait for Angular to process the form change and enable the Confirm button
        await expect(this.finishButton).toBeEnabled({ timeout: 10_000 });

        await this.finishButton.click();
    }
}