import { test, expect } from '@playwright/test';
import Tesseract from 'tesseract.js';


test.describe('Challenging DOM - The Internet HerokuApp', () => {

  test.beforeEach('Open the HerokuApp home page', async ({ page }) => {
    // Open the browser
    await page.goto('https://the-internet.herokuapp.com/');

    await page.getByRole('link', { name: 'Challenging DOM' }).click();

  });

  /*
  Scenario:
  The Challenging DOM page renders a canvas element with the text drawn 
  directly on it. Because canvas content is not part of the DOM text tree, 
  we verify it in two ways:
    
  1) extract the expected answer from the inline script source,
  2) run OCR on the actual canvas screenshot by using tesseract.js and compare both values.
  
  This confirms the page is rendering the right text and the canvas is
  visually readable.
  
  */

  test('verify canvas text is rendered and readable', async ({ page }) => {

    await expect(page.locator("div[class='example'] h3")).toHaveText('Challenging DOM');

    // The page draws a random answer string directly onto the canvas using strokeText().
    // Since the text is not exposed as a DOM node, we extract the expected value from the inline script
    // and compare it with OCR output from the rendered canvas image.

    const scriptTexts = await page.locator('script').allTextContents();
    const targetScript = scriptTexts.find(s => s.includes('strokeText'));
    expect(targetScript, 'Canvas drawing script should exist').toBeTruthy();

    const match = targetScript!.match(/strokeText\('([^']+)'/);
    expect(match, 'Canvas text should be present in the inline script').toBeTruthy();

    const expectedText = match?.[1] ?? null;
    
    const canvas = page.locator('canvas#canvas');
    await expect(canvas).toBeVisible();

    const buffer = await canvas.screenshot();
    const { data } = await Tesseract.recognize(buffer, 'eng');
    const canvasText = data.text.replace(/\s+/g, ' ').trim();

    console.log(`Canvas Text From inline script source: ${expectedText}`);
    console.log(`Extracted Canvas Text: ${canvasText}`);

    expect(expectedText).toBe(canvasText);

  });

});