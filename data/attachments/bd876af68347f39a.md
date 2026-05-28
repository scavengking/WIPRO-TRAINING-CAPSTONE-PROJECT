# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.setup.js >> authenticate via API to bypass Cloudflare
- Location: tests/auth.setup.js:8:6

# Error details

```
Error: API Login failed with status: 401

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | // tests/auth.setup.js
  2  | import { test as setup, expect } from '@playwright/test';
  3  | 
  4  | const authFile = 'playwright/.auth/user.json';
  5  | const API_BASE = 'https://api.practicesoftwaretesting.com';
  6  | const SITE_BASE = 'https://practicesoftwaretesting.com';
  7  | 
  8  | setup('authenticate via API to bypass Cloudflare', async ({ page, request }) => {
  9  |   const email = process.env.CUSTOMER_EMAIL ?? 'admin@practicesoftwaretesting.com';
  10 |   const password = process.env.CUSTOMER_PASSWORD ?? 'welcome01';
  11 | 
  12 |   console.log('Sending login request directly to backend API...');
  13 | 
  14 |   // 1. Hit the backend API directly (Bypasses Cloudflare UI challenge)
  15 |   const response = await request.post(`${API_BASE}/users/login`, {
  16 |     data: {
  17 |       email: email,
  18 |       password: password
  19 |     }
  20 |   });
  21 | 
  22 |   // Verify the API gave us a 200 OK success response
> 23 |   expect(response.status(), `API Login failed with status: ${response.status()}`).toBe(200);
     |                                                                                   ^ Error: API Login failed with status: 401
  24 | 
  25 |   // Extract the JWT authentication token from the response
  26 |   const responseBody = await response.json();
  27 |   const token = responseBody.access_token;
  28 |   expect(token, 'No access_token found in API response').toBeTruthy();
  29 | 
  30 |   console.log('API Login successful! Injecting token into browser...');
  31 | 
  32 |   // 2. Navigate to the base site just to establish the domain origin
  33 |   await page.goto(SITE_BASE);
  34 | 
  35 |   // 3. Inject the token into localStorage so the Angular app thinks we manually logged in
  36 |   await page.evaluate((jwt) => {
  37 |     localStorage.setItem('access_token', jwt);
  38 |   }, token);
  39 | 
  40 |   // Wait a brief moment to ensure localStorage is registered
  41 |   await page.waitForTimeout(500);
  42 | 
  43 |   // 4. Save the state for all other tests to use
  44 |   await page.context().storageState({ path: authFile });
  45 |   
  46 |   console.log(`✅ Session saved successfully to ${authFile}!`);
  47 | });
```