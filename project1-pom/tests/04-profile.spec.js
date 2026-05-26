// @ts-check
import { test, expect } from '../fixtures/index.js';
import profileData from '../data/profile.json' with { type: 'json' };
import userData from '../data/users.json' with { type: 'json' }; 

test.describe('Service 4 - User Profile & Navigation', () => {
    
    const user = userData[0]; 
    const newProfile = profileData[0];

    // 🔄 SETUP: This runs automatically before EVERY test in this block
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.login(user.email, user.password); 
    });

    // 🧪 TEST 1: The Profile Update 
    test('TC02 - Update first name and last name successfully', async ({ profilePage }) => {
        await test.step('Navigate to Profile', async () => {
            await profilePage.page.getByTestId('nav-menu').click();
            await profilePage.page.getByTestId('nav-my-profile').click();
        });

        await test.step('Update Profile Data', async () => {
            await profilePage.updateProfile(
                newProfile.firstName, 
                newProfile.lastName, 
                newProfile.phone
            );
        });
    });

    // 🧪 TEST 2: Validating the Dropdown (Using your CodeGen dump!)
    test('TC_Nav_01 - Verify all user dropdown links are visible', async ({ profilePage }) => {
        await profilePage.page.getByTestId('nav-menu').click();
        
        // We assert that every single link you found actually renders on the screen
        await expect(profilePage.page.getByTestId('nav-my-account')).toBeVisible();
        await expect(profilePage.page.getByTestId('nav-my-favorites')).toBeVisible();
        await expect(profilePage.page.getByTestId('nav-my-profile')).toBeVisible();
        await expect(profilePage.page.getByTestId('nav-my-invoices')).toBeVisible();
        await expect(profilePage.page.getByTestId('nav-my-messages')).toBeVisible();
        await expect(profilePage.page.getByTestId('nav-sign-out')).toBeVisible();
    });

    // 🧪 TEST 3: Navigation Execution
    test('TC_Nav_02 - Navigate to Favorites successfully', async ({ profilePage }) => {
        await profilePage.page.getByTestId('nav-menu').click();
        await profilePage.page.getByTestId('nav-my-favorites').click();
        
        // Assert that the URL actually changed to the favorites page
        await expect(profilePage.page).toHaveURL(/.*favorites/);
    });

});