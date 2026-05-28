// tests/auth.setup.js
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const API_BASE = 'https://api.practicesoftwaretesting.com';
const SITE_BASE = 'https://practicesoftwaretesting.com';

setup('authenticate via API to bypass Cloudflare', async ({ page, request }) => {
  const email = process.env.CUSTOMER_EMAIL ?? 'admin@practicesoftwaretesting.com';
  const password = process.env.CUSTOMER_PASSWORD ?? 'welcome01';

  console.log('Sending login request directly to backend API...');

  // 1. Hit the backend API directly (Bypasses Cloudflare UI challenge)
  const response = await request.post(`${API_BASE}/users/login`, {
    data: {
      email: email,
      password: password
    }
  });

  // Verify the API gave us a 200 OK success response
  expect(response.status(), `API Login failed with status: ${response.status()}`).toBe(200);

  // Extract the JWT authentication token from the response
  const responseBody = await response.json();
  const token = responseBody.access_token;
  expect(token, 'No access_token found in API response').toBeTruthy();

  console.log('API Login successful! Injecting token into browser...');

  // 2. Navigate to the base site just to establish the domain origin
  await page.goto(SITE_BASE);

  // 3. Inject the token into localStorage so the Angular app thinks we manually logged in
  await page.evaluate((jwt) => {
    localStorage.setItem('access_token', jwt);
  }, token);

  // Wait a brief moment to ensure localStorage is registered
  await page.waitForTimeout(500);

  // 4. Save the state for all other tests to use
  await page.context().storageState({ path: authFile });
  
  console.log(`✅ Session saved successfully to ${authFile}!`);
});