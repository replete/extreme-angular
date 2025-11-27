import { defineConfig, devices } from '@playwright/test';

const CI = !!process.env['CI'];

// https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testMatch: '**/*.e2e.test.ts',
  outputDir: './.playwright/e2e-test-results',
  fullyParallel: true,
  forbidOnly: CI, // fail if test.only() exists in CI
  retries: CI ? 2 : 0,
  ...(CI ? { workers: 1 } : {}),
  reporter: [['html', { outputFolder: './.playwright/e2e-report' }]],
  use: {
    baseURL: process.env['PLAYWRIGHT_TEST_BASE_URL'] ?? 'http://localhost:4200',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'e2e-chromium',
      testDir: './e2e',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'e2e-firefox',
      testDir: './e2e',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'e2e-webkit',
      testDir: './e2e',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
