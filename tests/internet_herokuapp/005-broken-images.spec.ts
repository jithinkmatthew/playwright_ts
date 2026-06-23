import { test, expect } from '@playwright/test';


test.describe('Broken Images - The Internet HerokuApp', () => {

  test.beforeEach('Open the HerokuApp home page', async ({ page }) => {
    // Open the browser
    await page.goto('https://the-internet.herokuapp.com/');
  });

  test('page has no broken images', async ({ page }) => {

    await page.getByRole('link', { name: 'Broken Images' }).click();
    await page.waitForLoadState('networkidle');

    const brokenImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .filter((img) => img.naturalWidth === 0 || img.naturalHeight === 0)
        .map((img) => (img as HTMLImageElement).src);
    });

    expect(brokenImages, `Broken images: ${brokenImages.join(', ')}`).toHaveLength(2);

  });

});