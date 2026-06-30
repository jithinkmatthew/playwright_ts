import { test, expect } from '@playwright/test';

test.describe('Dynamic Loading - The Internet HerokuApp', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading');

  });

  test('element should be on page that is hidden initially', async ({ page }) => {

    const exampleLink1 = page.getByText('Example 1');
    const heading = page.locator('h3');
    const startButton = page.locator('#start > button');
    const hiddenElement = page.locator('#finish h4');
    const spinner = page.locator('#loading');
    
    await expect(exampleLink1).toBeVisible();
    await exampleLink1.click()

    // verify heading and start button
    await expect(heading).toHaveText("Dynamically Loaded Page Elements");
    await expect(startButton).toBeVisible();
    
    // click on start button
    await startButton.click();

    // spinner should be visible
    await expect(spinner).toBeVisible();
    
    // wait for hidden element to be visible with a timeout of 10s
    await expect(hiddenElement).toBeVisible({ timeout: 10000 });
    await expect(spinner).not.toBeVisible()

  });

    test('element should be on page that rendered after the fact', async ({ page }) => {

    const exampleLink1 = page.getByText('Example 2');
    const heading = page.locator('h3');
    const startButton = page.locator('#start > button');
    const hiddenElement = page.locator('#finish h4');
    const spinner = page.locator('#loading');
    
    await expect(exampleLink1).toBeVisible();
    await exampleLink1.click()

    // verify heading and start button
    await expect(heading).toHaveText("Dynamically Loaded Page Elements");
    await expect(startButton).toBeVisible();
    
    // click on start button
    await startButton.click();

    // spinner should be visible
    await expect(spinner).toBeVisible();
    
    // wait for hidden element to be visible with a timeout of 10s
    await expect(hiddenElement).toBeVisible({ timeout: 10000 });
    await expect(hiddenElement).toHaveText("Hello World!");
    await expect(spinner).not.toBeVisible()

  });

});