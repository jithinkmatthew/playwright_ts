import { test, expect } from '@playwright/test';

test.describe('Digest Auth - The Internet HerokuApp', () => {

  test('should login successfully with Digest Authentication', async ({ browser }) => {
    
    // Create new context with Digest Auth credentials
    const context = await browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'admin'
      }
    });

    const page = await context.newPage();

    await page.goto('https://the-internet.herokuapp.com/digest_auth');

    // Assertions
    await expect(page.getByRole('heading', { name: 'Digest Auth' })).toBeVisible();
    await expect(page.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();
    await expect(page.locator('p')).toContainText('Congratulations');

    await context.close();
  });

});