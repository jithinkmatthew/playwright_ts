import { test, expect } from '@playwright/test';

test.describe('The Internet HerokuApp', () => {

  test.beforeEach('Open the HerokuApp home page', async ({ page }) => {
    // Open the browser
    await page.goto('https://the-internet.herokuapp.com/');

    await page.getByRole('link', { name: 'Add/Remove Elements' }).click();
    await expect(page.locator("div[id='content'] h3")).toHaveText('Add/Remove Elements');

  });

  test('add and delete button operation', async ({ page }) => {
      
    const addButton = page.getByRole('button', { name: 'Add Element' });
    const lastDeleteButton = page.locator('.added-manually').last();
    const firstDeleteButton = page.locator('.added-manually').nth(0)
    const thirdDeleteButton = page.locator('.added-manually').nth(3)
    const totalDeleteButtons = page.locator('.added-manually')
    
    //Verify that no Delete button present
    await expect(totalDeleteButtons).toHaveCount(0);
    
    await addButton.click();
    await expect(firstDeleteButton).toBeVisible();
    
    // Added waits for demo purpose only
    await page.waitForTimeout(300);
    
    await addButton.click();
    await addButton.click();
    await addButton.click();
    await addButton.click();
    await addButton.click();
    await addButton.click();
    
    // Added waits for demo purpose only
    await page.waitForTimeout(300);

    //Remove Last Button
    lastDeleteButton.click()
    // Added waits for demo purpose only
    await page.waitForTimeout(300);
    
    //Remove First Button
    firstDeleteButton.click()
    await page.waitForTimeout(300);
    
    //Remove Third Button
    thirdDeleteButton.click()

    // Verify the final number of delete buttons after Delete Operation
    await expect(totalDeleteButtons).toHaveCount(4);
    
    // Added this for demo purpose only
    await page.waitForTimeout(300);
     
  });

});
