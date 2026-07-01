import { test, expect } from '@playwright/test';

test.describe('Entry Ad Modal - The Internet HerokuApp', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/entry_ad');

  });

  test('should display the modal on load', async ({ page }) => {

    const heading = page.locator('div.example > h3');
    const modal = page.locator('#modal');
    const modalTitle = page.locator('div.modal-title > h3');
    const modalBody = page.locator('div.modal-body > p');
    const closeButton = page.locator('.modal-footer > p');

    await expect(modal).toBeVisible({ timeout:5000 });
    await expect(modalTitle).toHaveText('This is a modal window');
    await expect(modalBody).toContainText("It's commonly used to encourage");

    // close the modal
    await closeButton.click();
    await expect(modal).not.toBeVisible();

    // wait some time to react after the click
    await page.waitForTimeout(500); 
    
    await expect(heading).toHaveText('Entry Ad');

  });

  test('should display the modal again if the reset link is clicked', async ({ page }) => {

    const modal = page.locator('#modal');
    const modalTitle = page.locator('div.modal-title > h3');
    const closeButton = page.locator('.modal-footer > p');
    const modalEnableLink = page.locator('p >#restart-ad');

    // close the initial modal
    await expect(modal).toBeVisible();
    await closeButton.click();

    /**
     * click the "click here" text link 
     * 
     * Sometimes the modal doesn't pop up immediatly after clicking on the link.
     * So implement a continues click function until it shows
     * 
    */

    const maxAttempts = 10;
    let attempts = 0;

    while (!await modal.isVisible() && attempts < maxAttempts) {
        
      await modalEnableLink.click();
        
        // wait some time to react after the click
        await page.waitForTimeout(500); 

        if(await modal.isVisible()) {

          // verify that the modal should now pop up
          await expect(modal).toBeVisible();
          await expect(modalTitle).toHaveText('This is a modal window');
          
          break;
        }

        attempts++;
    }

  });
});