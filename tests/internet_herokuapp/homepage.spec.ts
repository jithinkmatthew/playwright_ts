import { test, expect } from '@playwright/test';

test.describe('The Internet HerokuApp - Home Page', () => {

  test.beforeEach(async ({ page }) => {
    // Fresh browser, but same URL
    await page.goto('https://the-internet.herokuapp.com/');
  });
  
  test('open home page', async ({ page }) => {
    await expect(page.locator("h1[class='heading']")).toBeVisible();
  });

  test('navigate to A/B testing', async ({ page }) => {
    await page.locator("a[href='/abtest']").click();
    await expect(page.locator("div[id='content'] h3")).toBeVisible();
    await expect(page.locator("div[id='content'] h3")).toContainText('A/B Test');
  });

});
