import { test, expect } from '@playwright/test';
import Tesseract from 'tesseract.js';


test.describe('Challenging DOM - The Internet HerokuApp', () => {

  test.beforeEach('Open the HerokuApp home page', async ({ page }) => {
    // Open the browser
    await page.goto('https://the-internet.herokuapp.com/challenging_dom');
    
    await page.waitForTimeout(2000);

    // Wait until full page (including images & canvas) is loaded
    // await page.waitForLoadState('networkidle');
    

  });

  

  /**
  * SCENARIO 1:
  * The Challenging DOM page renders a canvas element with the text drawn 
  * directly on it. Because canvas content is not part of the DOM text tree, 
  * we verify it in two ways:
    
  * 1) extract the expected answer from the inline script source,
  * 2) run OCR on the actual canvas screenshot by using tesseract.js and compare both values.
  
  * This confirms the page is rendering the right text and the canvas is
  * visually readable.
  */

  test('Scenario 1: verify canvas text is rendered and readable', async ({ page }) => {
    // test.skip();
    // await page.waitForTimeout(5000);
    await expect(page.locator("div[class='example'] h3")).toHaveText('Challenging DOM');

    // The page draws a random answer string directly onto the canvas using strokeText().
    // Since the text is not exposed as a DOM node, we extract the expected value from the inline script
    // and compare it with OCR output from the rendered canvas image.

    const scriptTexts = await page.locator('script').allTextContents();
    const targetScript = scriptTexts.find(s => s.includes('strokeText'));
    expect(targetScript, 'Canvas drawing script should exist').toBeTruthy();

    const match = targetScript!.match(/strokeText\('([^']+)'/);
    expect(match, 'Canvas text should be present in the inline script').toBeTruthy();

    // const expectedText = match?.[1] ?? null;
    const expectedText = match![1].replace(/\s+/g, ' ').trim();
    expect(expectedText).toMatch(/^Answer:\s*\d+$/);

    const canvas = page.locator('canvas#canvas');
    await expect(canvas).toBeVisible();

    const buffer = await canvas.screenshot();
    const { data } = await Tesseract.recognize(buffer, 'eng');
    const canvasText = data.text.replace(/\s+/g, ' ').trim();

    console.log(`Canvas Text From inline script source: ${expectedText}`);
    console.log(`Extracted Canvas Text: ${canvasText}`);

    expect(canvasText).toContain('Answer:');
    expect(canvasText).toMatch(/^Answer:\s*\d+$/);
    expect(expectedText).toBe(canvasText);

  });

  /**
   * SCENARIO 2: Table Cell Data Validation
   */
  test('Scenario 2: validate data inside a specific table cell', async ({ page }) => {
    
    // Let's find the row containing 'Iuvaret3' and verify its 'Dolor' column value is 'Adipisci3'
    const row = page.locator('table tbody tr', { hasText: 'Iuvaret3' });
    // Column 0: Lorem, Column 1: Ipsum, Column 2: Dolor
    const dolorCell = row.locator('td').nth(2);
    // Verify that the column value is 'Adipisci3'
    await expect(dolorCell).toHaveText('Adipisci3');

  });

  /**
   * SCENARIO 3: Clicking Dynamic Buttons
   */
  test('Scenario 3: click side buttons using robust text locators', async ({ page }) => {
    // test.skip();
    // await page.waitForTimeout(5000);

    const blueButton = page.locator('div a[class="button"]');
    const redButton = page.locator('a.button.alert');
    const greenButton = page.locator('a.button.success');

    await expect(blueButton).toBeVisible();
    await blueButton.click();
    await page.waitForLoadState('load');

    await expect(redButton).toBeVisible();
    await redButton.click();
    await page.waitForLoadState('load');

    await expect(greenButton).toBeVisible();
    await greenButton.click();
    await page.waitForLoadState('load');

  });

});