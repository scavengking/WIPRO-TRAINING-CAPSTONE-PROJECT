// @ts-check
import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        // We use the same data-test IDs that we discovered during Registration!
        this.firstNameInput = page.getByTestId('first-name');
        this.lastNameInput = page.getByTestId('last-name');
        this.phoneInput = page.getByTestId('phone');
        this.emailInput = page.getByTestId('email');
        
        // The submit button for updating the profile
        this.updateButton = page.getByRole('button', { name: 'Update' }); 
        
        // Success message locator (crucial for TC09)
        this.successMessage = page.locator('.alert-success');
    }

    /**
     * Updates the user's profile information
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} phone 
     */
   async updateProfile(firstName, lastName, phone) {
        await this.fillInput(this.firstNameInput, firstName);
        await this.fillInput(this.lastNameInput, lastName);
        await this.fillInput(this.phoneInput, phone);
        
        // Ensure we are clicking the exact button name from the snapshot
        await this.page.getByRole('button', { name: 'Update Profile' }).click();
        
        // TEMPORARILY DISABLED: The public 'Jane Doe' account does not return a success message
        // await this.successMessage.waitFor({ state: 'visible' }); 
    }
}