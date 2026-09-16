// spec: specs/google-test-plan.md
// seed: tests/seed.spec.ts

/**
 * Test Suite: LiteCart Store Smoke Coverage
 *
 * Covers basic store functionality:
 * - Page load and title verification
 * - Basic navigation and element visibility
 */
import { expect, type Page, test } from '@playwright/test';

async function openHomePage(page: Page): Promise<void> {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
}

test.describe('LiteCart Store Tests', () => {
  test.beforeEach(async ({ page }) => {
    await openHomePage(page);  
    await expect(page.locator('.quantity')).toHaveText('0');
  });

  
  test('Order of a single item without a discount', async ({ page }) => {

    await page.locator('[name="email"]').fill('TestEvg@test.com');
    await page.locator('[name="password"]').fill('Pass123');
    await page.locator('[name="login"]').click();

    //TestEvg@test.com
    //Pass123

    await page.waitForTimeout(20000); // 5 секунд
    await expect(page).toHaveTitle(/My Store|Online Store/i);
    await expect(page.locator('body')).toBeVisible();
  });
});