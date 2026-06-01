// spec: specs/google-test-plan.md
// seed: tests/seed.spec.ts

/**
 * Test Suite: Google Smoke Coverage
 *
 * Covers core Google Search functionality through the browser UI:
 * - Page load and search input availability
 * - Submitting a search via the Enter key
 * - Autocomplete suggestion display and dismissal
 * - Safe handling of special characters / XSS payloads in the search input
 *
 * All tests navigate to the Google homepage before execution and handle
 * cookie-consent dialogs automatically via the `dismissConsentIfPresent` helper.
 */
import { expect, type Locator, type Page, test } from '@playwright/test';

const SUGGESTION_TIMEOUT = 10_000;

function getSearchInput(page: Page): Locator {
  return page.locator('textarea[name="q"], input[name="q"]').first();
}

async function dismissConsentIfPresent(page: Page): Promise<void> {
  const consentButtons = [
    /accept all/i,
    /i agree/i,
    /reject all/i,
    /no thanks/i,
    /not now/i,
  ];

  for (const name of consentButtons) {
    const button = page.getByRole('button', { name }).first();

    if (await button.isVisible().catch(() => false)) {
      await button.click().catch(() => {});
      return;
    }
  }
}

async function openGoogleHome(page: Page): Promise<void> {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await dismissConsentIfPresent(page);
  await expect(getSearchInput(page)).toBeVisible();
}

// Suite: Google Smoke Coverage — end-to-end smoke tests verifying Google Search homepage and core search interactions
test.describe('Google Smoke Coverage', () => {
  // Hook: beforeEach — navigates to the Google homepage and dismisses any cookie-consent dialog before each test
  test.beforeEach(async ({ page }) => {
    await openGoogleHome(page);
  });

  /**
   * Test: Homepage loads and search input is usable
   * Scenario: User opens the Google homepage and types a query into the search input.
   * Expected: The page title matches "Google", the body is visible, the search input is visible and accepts text input.
   */
  test('Homepage loads and search input is usable', async ({ page }) => {
    await expect(page).toHaveTitle(/Google/i);
    await expect(page.locator('body')).toBeVisible();
    await expect(getSearchInput(page)).toBeVisible();

    await getSearchInput(page).click();
    await getSearchInput(page).fill('Playwright');
    await expect(getSearchInput(page)).toHaveValue('Playwright');
  });

  /**
   * Test: Search works with Enter key
   * Scenario: User types a search query and submits it by pressing the Enter key.
   * Expected: The browser navigates to the Google search results URL and the results container is visible with the original query retained in the input.
   */
  test('Search works with Enter key', async ({ page }) => {
    await getSearchInput(page).fill('Playwright testing');
    await getSearchInput(page).press('Enter');

    await expect(page).toHaveURL(/\/search\?/i);
    await expect(page.locator('#search')).toBeVisible();
    await expect(getSearchInput(page)).toHaveValue(/Playwright testing/i);
  });

  /**
   * Test: Autocomplete suggestions appear and can be dismissed
   * Scenario: User starts typing a partial query; then presses Escape to dismiss the suggestion list.
   * Expected: A suggestion listbox appears with at least one option while typing, and disappears after Escape while the input retains its value.
   */
  test('Autocomplete suggestions appear and can be dismissed', async ({ page }) => {
    await getSearchInput(page).fill('play');

    const suggestionList = page.locator('[role="listbox"]').first();
    const firstSuggestion = page.locator('[role="listbox"] [role="option"], [role="listbox"] li').first();

    await expect(suggestionList).toBeVisible({ timeout: SUGGESTION_TIMEOUT });
    await expect(firstSuggestion).toBeVisible();

    await getSearchInput(page).press('Escape');
    await expect(suggestionList).toBeHidden();
    await expect(getSearchInput(page)).toHaveValue('play');
  });

  /**
   * Test: Search handles special characters safely
   * Scenario: User types an XSS payload into the search input and submits it via Enter.
   * Expected: The browser navigates to the search results page without triggering any JavaScript dialog, confirming the input is treated as plain text.
   */
  test('Search handles special characters safely', async ({ page }) => {
    const payload = '<script>alert(1)</script>';
    let dialogSeen = false;

    page.on('dialog', async dialog => {
      dialogSeen = true;
      await dialog.dismiss();
    });

    await getSearchInput(page).fill(payload);
    await getSearchInput(page).press('Enter');

    await expect(page).toHaveURL(/\/search\?/i);
    await expect(page.locator('#search')).toBeVisible();
    expect(dialogSeen).toBeFalsy();
    await expect(getSearchInput(page)).toHaveValue(payload);
  });
});