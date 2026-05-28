// tests/auth.setup.js
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/auth/login');
  
  // Use env variables with your fallbacks
  const email = process.env.CUSTOMER_EMAIL ?? 'admin@practicesoftwaretesting.com';
  const password = process.env.CUSTOMER_PASSWORD ?? 'welcome01';

  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-submit').click();
  
  // Wait until the user menu is visible to prove we are logged in
  await expect(page.getByTestId('nav-menu')).toBeVisible();

  // Save the logged-in cookie to a file so other workers can use it
  await page.context().storageState({ path: authFile });
});