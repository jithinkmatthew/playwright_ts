import { test, expect } from '@playwright/test';

test.describe('Context Menu - The Internet HerokuApp', () => {

  test.beforeEach('Open the HerokuApp home page', async ({ page }) => {
    // Open the browser
    await page.goto('https://the-internet.herokuapp.com/');

    /** Wait until full page (including images & canvas) is loaded */
    await page.waitForLoadState('load');
  });

  test('right click on the element and accept alert', async ({ page }) => {

    await page.getByRole('link', { name: 'Context Menu' }).click();

    const hotSpot = page.locator('#hot-spot');
    const heading = page.locator("div.example h3")
    
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Context Menu');
    
    await expect(hotSpot).toBeVisible();

    /** Listen for dialog */
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('You selected a context menu');
      
      await page.waitForTimeout(500);
      await dialog.accept();
    });

    /** Right click */
    await hotSpot.click({ button: 'right' });

    await page.waitForTimeout(500);

  });

});
