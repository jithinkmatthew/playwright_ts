import { test, expect } from '@playwright/test';

test.describe('The Internet HerokuApp', () => {
  
  test('open home page', async ({ page }) => {
    
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page.locator("h1[class='heading']")).toBeVisible();
    
    // Not needed in actual-test cases. For demo purpose only
    await page.waitForTimeout(300); 
  });

});
