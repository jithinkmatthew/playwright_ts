import { test, expect } from '@playwright/test';

test.describe('Checkout Flow - SauceDemo', () => {
  test('TC-07: Complete checkout with valid customer details', async ({ page }) => {
    // Step 1: Login as standard_user
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Step 2: Verify products page loaded
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Coca-Cola Light')).toBeVisible();
    
    // Step 3: Add product to cart
    await page.getByRole('button', { name: 'Add to cart Coca-Cola Light' }).click();
    await expect(page.getByText('Coca-Cola Light')).toContainText('in your cart');
    
    // Step 4: Click shopping cart
    await page.getByRole('link', { name: 'Shopping cart' }).click();
    await expect(page.getByText('Your cart')).toBeVisible();
    
    // Step 5: Click Checkout button
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.getByText('Checkout: Address')).toBeVisible();
    
    // Step 6: Fill checkout form (Step 1)
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '98765');
    await page.click('#continue');
    
    // Step 7: Verify Order Summary (Step 2)
    await expect(page.getByText('Order Summary')).toBeVisible();
    await expect(page.getByText('Coca-Cola Light')).toBeVisible();
    await expect(page.getByText('$8.00')).toBeVisible();
    
    // Step 8: Click Finish
    await page.getByRole('button', { name: 'Finish' }).click();
    
    // Step 9: Verify order completion
    await expect(page.getByText('Thank you for your purchase!')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back to homepage' })).toBeVisible();
    
    // Step 10: Return to homepage
    await page.getByRole('button', { name: 'Back to homepage' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});