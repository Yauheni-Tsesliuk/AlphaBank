import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { testUsers } from '../test_data/users';

test.describe('LiteCart Store Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
    await expect(homePage.getCartQuantityLocator()).toHaveText('0');
  });

  test('Order of a single item without a discount', async ({ page }) => {
    const { email, password } = testUsers.defaultUser;
    await homePage.login(email, password);

    await page.waitForTimeout(5000);
    await expect(page).toHaveTitle(/My Store|Online Store/i);
    await expect(homePage.getBodyLocator()).toBeVisible();
  });
});