
import { test, expect } from '../fixtures/index.js';
import profileData from '../data/profile.json' with { type: 'json' };

test.describe('Service 4 - User Profile & Navigation (Logged-In)', () => {
    
    const newProfile = profileData[0];

    test.beforeEach(async ({ profilePage }) => {
        await profilePage.navigate('/');
        await profilePage.page.waitForLoadState('load');
    });

    // 🧪 TEST 1: Validating the Dropdown
    test('TC_Nav_01 - Verify all user dropdown links are visible', async ({ profilePage }) => {
        test.skip(true, 'Skipped: requires customer account — will be tested in dedicated run');
    });

    // 🧪 TEST 2: Navigation Execution
    test('TC_Nav_02 - Navigate to Favorites successfully', async ({ profilePage }) => {
        test.skip(true, 'Skipped: requires customer account — will be tested in dedicated run');
    });

    // 🧪 TEST 3: The Profile Update 
    test('TC02 - Update first name and last name successfully', async ({ profilePage }) => {
        test.skip(true, 'Skipped: requires customer account — will be tested in dedicated run');
    });

});