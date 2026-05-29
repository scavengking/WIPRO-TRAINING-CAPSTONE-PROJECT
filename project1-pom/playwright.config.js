// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  timeout: 60000,
  testDir: './tests',
  fullyParallel: true, // You get your parallel workers back!
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['allure-playwright'],
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9,en;q=0.8',
    },
  },
  projects: [
    // 1. Run the setup project first to grab the login session
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },
    // 2. Main testing projects depend on setup and use the saved session
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json', 
      },
      dependencies: ['setup'],
    }
    // { 
    //   name: 'firefox',  
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
    // { 
    //   name: 'webkit',   
    //   use: { 
    //     ...devices['Desktop Safari'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
  ],
});