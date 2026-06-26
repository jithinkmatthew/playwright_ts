import { test, expect } from '@playwright/test';

test.describe('Disappearing Elements - The Internet HerokuApp', () => {

  test('should detect dynamic menu elements changing on refresh', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/disappearing_elements');

    await expect(page.locator('h3')).toHaveText('Disappearing Elements');

    const nav = page.locator('ul li');
    const gallery = nav.filter({ hasText: 'Gallery' });

    console.log(await nav.count())

    /** set a variable to check gallery button presence. */
    let galleryNotPresent = true
    let attempts = 0;
    const maxAttempts = 10;

    /** loop starts */
    while (galleryNotPresent && attempts < maxAttempts) {

      /** Get the total number of nav links */
      const navCount = await nav.count();

      /** If the count > 4 means the "Gallery" nav link may be present */
      if (navCount > 4) {

        /** Confirm the gallery nav link is present */
        await expect(gallery).toBeVisible();
        galleryNotPresent = false //Make the variable

      } else {

        console.log('Gallery is not present on this load');
      }

      await page.waitForTimeout(3000);
      await page.reload();

      console.log("attempt:")
      console.log(attempts)

      attempts++;
    }

  });

  test('other static elements should always be visible and functional', async ({ page }) => {

    // test.skip()

    await page.goto('https://the-internet.herokuapp.com/disappearing_elements');

    await expect(page.locator('h3')).toHaveText('Disappearing Elements');

    const nav = page.locator('ul li');

    console.log(nav)
    console.log(await nav.allTextContents())
    console.log(await nav.allInnerTexts())

    const home = nav.filter({ hasText: 'Home' });
    const about = nav.filter({ hasText: 'About' });
    const contactUs = nav.filter({ hasText: 'Contact Us' });
    const portfolio = nav.filter({ hasText: 'Portfolio' });
    const gallery = nav.filter({ hasText: 'Gallery' });

    /** These four are present on every page load, regardless of randomization */
    await expect(home).toBeVisible();
    await expect(about).toBeVisible();
    await expect(contactUs).toBeVisible();
    await expect(portfolio).toBeVisible();

    const galleryCount = await gallery.count();

    if (galleryCount > 0) {

      console.log('Gallery is present on this load');
      await expect(gallery).toBeVisible();

    } else {
      console.log('Gallery is absent on this load (expected on most loads)');
      expect(galleryCount).toBe(0);
    }

  });

});