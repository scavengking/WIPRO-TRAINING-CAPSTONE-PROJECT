
// Notice we import 'test' and 'expect' from our custom fixture, NOT directly from playwright
import { test, expect } from '../fixtures/index.js';

// Import our JSON data
import loginData from '../data/users.json' with { type: 'json' };

test.describe('Service 1 - Authentication', () => {

    // Instructor Concept: Iterating over JSON data
    loginData.forEach((scenario) => {
        
        // Instructor Concept: Custom Fixture injection ({ loginPage })
        test(`TC - Login: ${scenario.testName}`, async ({ loginPage, preparedPage }) => {
            
            await test.step(`Attempt login with email: ${scenario.email}`, async () => {
                await loginPage.login(scenario.email, scenario.password);
            });

            await test.step('Validate outcome', async () => {
        if (scenario.expectSuccess) {
            await expect.soft(preparedPage).toHaveURL(/.*(account|dashboard)/);
        } else {
            // Using the logical OR (||) operator as a fallback
            await loginPage.expectErrorToBeVisible(scenario.errorMsg || '');
        }
    });
            
        });
    });
});