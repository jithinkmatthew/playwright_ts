import { test, expect } from '@playwright/test';

test('Basic Auth - Successful Login', async ({ browser }) => {
  
  // Create new context with Basic Auth credentials
  const context = await browser.newContext({
    httpCredentials: {
      username: 'admin',
      password: 'admin'
    }
  });

  const page = await context.newPage();

  await page.goto('https://the-internet.herokuapp.com/basic_auth');

  // Strong assertions
  await expect(page.getByRole('heading', { name: 'Basic Auth' })).toBeVisible();
  await expect(page.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();
  await expect(page.locator('p')).toContainText('Congratulations');

  // Added this for demo purpose only
  await page.waitForTimeout(300);

  // Clean up
  await context.close();

});