import { test, expect } from '@playwright/test';

test.describe('Checkboxes - The Internet HerokuApp', () => {

  test.beforeEach('Open the HerokuApp home page', async ({ page }) => {
    // Open the browser
    await page.goto('https://the-internet.herokuapp.com/');
    
    /** Wait until full page (including images & canvas) is loaded */
    await page.waitForLoadState('load');
  });

  test('verify default state of the checkboxes', async ({ page }) => {

    await page.getByRole('link', { name: 'Checkboxes' }).click();
    
    await expect(page.locator("div.example h3")).toBeVisible();
    await expect(page.locator("div.example h3")).toHaveText('Checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');
    const firstCheckbox = checkboxes.nth(0);
    const secondCheckbox = checkboxes.nth(1);
    
    /** Verify there are 2 checkboxes */ 
    await expect(checkboxes).toHaveCount(2);

    /** First checkbox should be unchecked by default */ 
    await expect(firstCheckbox).not.toBeChecked();

    /** Second checkbox should be unchecked by default */ 
    await expect(secondCheckbox).toBeChecked();

  });

  test('should check and uncheck checkboxes', async ({ page }) => {

    await page.getByRole('link', { name: 'Checkboxes' }).click();

    const checkboxes = page.locator('input[type="checkbox"]');
    const firstCheckbox = checkboxes.nth(0);
    const secondCheckbox = checkboxes.nth(1);

    /** Check the first checkbox */
    await firstCheckbox.click();
    await expect(firstCheckbox).toBeChecked();

    /** Uncheck the second checkbox */
    await secondCheckbox.click();
    await expect(secondCheckbox).not.toBeChecked();

    /**Togle both again */
    await firstCheckbox.click();
    await secondCheckbox.click();

    /** verify the status after the click */
    await expect(firstCheckbox).not.toBeChecked();
    await expect(secondCheckbox).toBeChecked();

  });

});
