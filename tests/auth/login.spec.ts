import { test, expect } from '../../fixtures';
import { users } from '../../test-data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.only('should display login page title', async ({ loginPage }) => {
    const title = await loginPage.getTitle();
    expect(title).toContain('AlphaBank');
  });

  test('should login successfully with valid credentials', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(users.valid.username, users.valid.password);
    await dashboardPage.waitForPageLoad();
    expect(await dashboardPage.isLoaded()).toBe(true);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    expect(await loginPage.isErrorVisible()).toBe(true);
    expect(await loginPage.getErrorMessage()).toContain('Invalid');
  });

  test('should show error with empty credentials', async ({ loginPage }) => {
    await loginPage.login('', '');
    expect(await loginPage.isErrorVisible()).toBe(true);
  });
});
