import { test, expect } from '@playwright/test';

test.describe('Dropdown List - The Internet HerokuApp', () => {

  test('verify drop down functionality', async ({ page }) => {
    
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    
    const dropdownMenu = page.locator('#dropdown');
    const defaultOption = page.locator('#dropdown option[selected]');
    const selectedOption = page.locator('#dropdown option:checked');

    /**
     * 
     * #dropdown option[selected] - to check the initial/default selected option set by the developer.
     * #dropdown option:checked - to check the current state of the dropdown.
     * 
     */

    await expect(defaultOption).toHaveText('Please select an option');

    await dropdownMenu.selectOption({ label: 'Option 1' });
    await expect(dropdownMenu).toHaveValue('1');
    await expect(selectedOption).toHaveText('Option 1');
  
    await dropdownMenu.selectOption({ value: '2' });
    await expect(selectedOption).toHaveText('Option 2');

    await page.waitForTimeout(500);
    
  });
});