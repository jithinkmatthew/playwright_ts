import { test, expect } from '@playwright/test';

test.describe('The Internet HerokuApp - Home Page', () => {
  
  test('open home page', async ({ page }) => {
    await page.goto('https://ui-for-automation.vercel.app/');

    await page.waitForTimeout(3000); 
  });

});
