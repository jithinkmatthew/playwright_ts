import { test, expect } from '@playwright/test';

test.describe('Dynamic Controls - The Internet HerokuApp', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  });

  test('should handle adding and removing a checkbox dynamically', async ({ page }) => {
    
    const initialCheckbox = page.locator('#checkbox input');
    const dynamicCheckbox = page.locator('#checkbox-example input');
    const addRemoveButton = page.locator('#checkbox-example > button');
    const message = page.locator('#message');

    /** verify checkbox is initially there and click on it */
    await expect(initialCheckbox).toBeVisible();
    await initialCheckbox.check();

    /** click "Remove" and wait for the loader to disappear */
    await addRemoveButton.click();
    
    /** playwright auto-waits for the text to appear */
    await expect(message).toHaveText("It's gone!");
    await expect(initialCheckbox).not.toBeVisible();

    /** click "Add" to bring it back */
    await addRemoveButton.click();
    await expect(message).toHaveText("It's back!");
    await expect(dynamicCheckbox).toBeVisible();

    /** click "Add" again */
    await dynamicCheckbox.check();
    await addRemoveButton.click();
    await expect(message).toHaveText("It's gone!");
    await expect(message).not.toHaveText("It's back!");

  });

  test('should handle enabling and disabling an input field dynamically', async ({ page }) => {

    const inputField = page.locator('#input-example > input');
    const enableDisableButton = page.locator('#input-example > button');
    const message = page.locator('#message');

    /** initially it should be disabled */
    await expect(inputField).toBeDisabled();

    /** click on the button and it should be enabled */
    await enableDisableButton.click();
    await expect(message).toHaveText("It's enabled!");
    await expect(inputField).toBeEnabled();

    /** enter data in the field */
    await inputField.fill("Test 123")
    await expect(inputField).toHaveValue('Test 123');
    
    /** disable one more time */
    await enableDisableButton.click();
    await expect(message).toHaveText("It's disabled!");
    await expect(inputField).toBeDisabled();

    /** verify the value after disable */
    await expect(inputField).toHaveValue('Test 123');

  });
});