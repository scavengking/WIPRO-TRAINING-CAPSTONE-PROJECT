// tests/auth.setup.js
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // FIX: Force Playwright to wait until the network is totally quiet before proceeding
  await page.goto('/auth/login', { waitUntil: 'networkidle' });
  
  const email = process.env.CUSTOMER_EMAIL ?? 'admin@practicesoftwaretesting.com';
  const password = process.env.CUSTOMER_PASSWORD ?? 'welcome01';

  // FIX: Explicitly wait for the element to be visible before trying to fill it
  const emailInput = page.getByTestId('email');
  await emailInput.waitFor({ state: 'visible', timeout: 15000 });
  await emailInput.fill(email);
  
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-submit').click();
  
  await expect(page.getByTestId('nav-menu')).toBeVisible();

  await page.context().storageState({ path: authFile });
});