import { test, expect } from '@playwright/test';

test.describe('Dynamic Content - The Internet HerokuApp', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_content');
    await expect(page.getByRole('heading', { name: 'Dynamic Content' })).toBeVisible();
  });

  test('should display different content after page refresh', async ({ page }) => {
    
    /** Capture content before refresh */

    /** METHOD 1 : Get texts as array */
    const initialTexts = await page.locator('#content > div.row > div.large-10').allInnerTexts();

    console.log("Length:" + initialTexts.length)
    console.log(typeof (initialTexts))
    console.log("initial Content", initialTexts)

    /**
     * 
     * While Playwright has a simple locator.getAttribute('src') method, it only returns the attribute for the first element it finds.
     * 
     * Using evaluateAll() tells Playwright to find all matching elements, drop into the browser's context, 
     * and run a quick JavaScript .map() to pull the src out of every single one of them and store in an array of strings
     * just like allInnerTexts() does!
     * 
     */

    const initialSrcs = await page.locator('#content > div.row > div > img').evaluateAll(elements =>
      elements.map(el => el.getAttribute('src'))
    );

    console.log('Img Content:', initialSrcs);
    console.log(typeof (initialSrcs))

    /** Refresh the page */
    await page.reload();
    await page.waitForLoadState('networkidle');

    /** Capture content after refresh */
    const newTexts = await page.locator('#content > div.row > div.large-10').allInnerTexts();
    const newSrcs = await page.locator('#content > div.row > div > img').evaluateAll(elements =>
      elements.map(el => el.getAttribute('src'))
    );

    console.log('Content After Refresh:', newSrcs);

    /** Verify the image description */
    expect(initialTexts).not.toEqual(newTexts);
    expect(initialTexts).not.toBe(newTexts);

    /** Verify the image presence */
    expect(initialSrcs).not.toEqual(newSrcs);
    expect(initialSrcs).not.toBe(newSrcs);

    /** TODO : METHOD 2 : Get texts as an individual web element verify as a single element */

  });

  test('should have 3 dynamic content blocks', async ({ page }) => {

    const blocks = page.locator('#content > div.row');
    await expect(blocks).toHaveCount(3);

  });

  test('should contain an image', async ({ page }) => {

    const avatarImages = page.locator('#content > div.row > div > img')

    const avatarImageFirst = avatarImages.first()
    const avatarImageSecond = avatarImages.nth(1)
    const avatarImageThird = avatarImages.last()

    await expect(avatarImageFirst).toBeVisible();
    await expect(avatarImageSecond).toBeVisible();
    await expect(avatarImageThird).toBeVisible();

    await expect(avatarImages).toHaveCount(3);

    await expect(avatarImageFirst).toHaveAttribute('src', /avatar/);
    await expect(avatarImageSecond).toHaveAttribute('src', /avatar/);
    await expect(avatarImageThird).toHaveAttribute('src', /avatar/);

  });

  test('should keep some content static when using the query parameter', async ({ page }) => {

    await page.getByText('click here').click();
    await page.waitForLoadState('networkidle');
    
    const initialTexts = await page.locator('#content > div.row > div.large-10').allInnerTexts();
    const initialSrcs = await page.locator('#content > div.row > div > img').evaluateAll(elements =>
      elements.map(el => el.getAttribute('src'))
    );

    /** Refresh the page */
    await page.reload();
    await page.waitForLoadState('networkidle');

    /** Capture content after refresh */
    const newTexts = await page.locator('#content > div.row > div.large-10').allInnerTexts();
    const newSrcs = await page.locator('#content > div.row > div > img').evaluateAll(elements =>
      elements.map(el => el.getAttribute('src'))
    );

    expect(initialTexts[0]).toBe(newTexts[0]);   // Content should be the same
    expect(initialTexts[1]).toBe(newTexts[1]);   // Content should be the same
    expect(initialTexts[2]).not.toBe(newTexts[2]);   // Content should be different

    expect(initialSrcs[0]).toBe(newSrcs[0]);   // src should be the same
    expect(initialSrcs[1]).toBe(newSrcs[1]);   // src should be the same
    expect(initialSrcs[2]).not.toBe(newSrcs[2]);   // src should be different

  });

});