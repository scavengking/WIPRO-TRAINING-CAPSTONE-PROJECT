
import { expect } from '../fixtures/index.js';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        // Semantic locators mapping to practicesoftwaretesting.com
        // this.emailInput = page.getByPlaceholder('Your email');
        // this.passwordInput = page.getByPlaceholder('Your password');
        // this.loginButton = page.getByRole('button', { name: 'Login' });
        // this.errorMessage = page.locator('.alert, .help-block, [data-test="login-error"]'); // Example fallback
        // Using the exact data-test attributes you found in the HTML!
        this.emailInput = page.getByTestId('email');
        
        // Assuming the password field follows the exact same pattern
        this.passwordInput = page.getByTestId('password'); 
        
        // Using the submit button's data-test attribute
        this.loginButton = page.getByTestId('login-submit');
        
        // The standard error locator we updated earlier
        this.errorMessage = page.locator('.alert, .help-block, [data-test="login-error"]');
    }

    async goTo() {
        await this.navigate('/auth/login');
    }

    /**
     * @param {string} email
     * @param {string} password
     */
    async login(email, password) {
        await this.fillInput(this.emailInput, email);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

    /**
     * @param {string} expectedText
     */
    async expectErrorToBeVisible(expectedText) {
        const errorElement = this.page.getByText(expectedText);
        await expect(errorElement).toBeVisible();
    }
}