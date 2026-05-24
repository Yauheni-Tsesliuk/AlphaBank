import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly welcomeMessage: Locator;
  private readonly accountBalance: Locator;
  private readonly logoutButton: Locator;
  private readonly navigationMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = page.getByTestId('welcome-message');
    this.accountBalance = page.getByTestId('account-balance');
    this.logoutButton = page.getByTestId('logout-button');
    this.navigationMenu = page.getByTestId('navigation-menu');
  }

  async goto(): Promise<void> {
    await this.navigate('/dashboard');
  }

  async getWelcomeMessage(): Promise<string> {
    return (await this.welcomeMessage.textContent()) ?? '';
  }

  async getAccountBalance(): Promise<string> {
    return (await this.accountBalance.textContent()) ?? '';
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  async isLoaded(): Promise<boolean> {
    return this.welcomeMessage.isVisible();
  }
}
