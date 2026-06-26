import { test, expect } from '@playwright/test';

test.describe('Drag and Drop - The Internet HerokuApp', () => {

    test('should swap box A and box B via drag and drop', async ({ page }) => {
      
      await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
      
      const boxA = page.locator('#column-a');
      const boxB = page.locator('#column-b');

      /** Initial Check: Confirm Box A has text "A" and Box B has text "B" */ 
      await expect(boxA).toHaveText('A');
      await expect(boxB).toHaveText('B');

      /** Perform the drag and drop action */
      await boxA.dragTo(boxB);

      /** Final Check :  After dragging A onto B, their internal text contents should be swapped. */ 
      await expect(boxA).toHaveText('B');
      await expect(boxB).toHaveText('A');

      await page.waitForTimeout(1000);

    });
  });