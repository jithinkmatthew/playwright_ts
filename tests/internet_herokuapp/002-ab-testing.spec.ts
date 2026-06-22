import { test, expect } from '@playwright/test';

test.describe('The Internet HerokuApp', () => {

  test.beforeEach('Open the HerokuApp home page', async ({ page }) => {
    // Open the browser
    await page.goto('https://the-internet.herokuapp.com/');
  });

  test('navigate to A/B testing', async ({ page }) => {
    await page.locator("a[href='/abtest']").click();
    await expect(page.locator("div[id='content'] h3")).toBeVisible();
    await expect(page.locator("div[id='content'] h3")).toContainText('A/B Test');
    
    // Not needed in actual-test cases. For demo purpose only
    await page.waitForTimeout(500); 
  });

});
