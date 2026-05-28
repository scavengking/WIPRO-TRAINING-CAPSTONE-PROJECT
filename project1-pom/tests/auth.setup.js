// tests/auth.setup.js
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const API_BASE  = 'https://api.practicesoftwaretesting.com';
const SITE_BASE = 'https://practicesoftwaretesting.com';

setup('authenticate via API to bypass Cloudflare', async ({ page, request }) => {

    // Using '||' to safely fallback if GitHub Actions injects an empty string
    const email    = process.env.CUSTOMER_EMAIL    || 'customer@practicesoftwaretesting.com';
    const password = process.env.CUSTOMER_PASSWORD || 'welcome01';

    console.log(`Sending login request directly to backend API for: ${email}`);

    // Hitting the correct backend endpoint
    const response = await request.post(`${API_BASE}/users/login`, {
        data: { email, password },
    });

    expect(
        response.status(),
        `API Login failed for ${email} with status: ${response.status()}`
    ).toBe(200);

    const responseBody = await response.json();
    const token = responseBody.access_token;
    expect(token, 'No access_token found in API response').toBeTruthy();

    console.log('API Login successful! Injecting token into browser...');

    await page.goto(SITE_BASE);

    await page.evaluate((jwt) => {
        localStorage.setItem('access_token', jwt);
    }, token);

    await page.waitForTimeout(500);

    await page.context().storageState({ path: authFile });

    console.log(`✅ Session saved successfully to ${authFile}!`);
});