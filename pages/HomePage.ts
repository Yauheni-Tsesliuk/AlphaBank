import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly cartQuantity: Locator;
  private readonly body: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.locator('[name="login"]');
    this.cartQuantity = page.locator('.quantity');
    this.body = page.locator('body');
  }

  async open() {
    await this.goto('/');
  }

  //default
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getCartQuantity() {
    return this.cartQuantity.textContent();
  }

  getCartQuantityLocator() {
    return this.cartQuantity;
  }

  getBodyLocator() {
    return this.body;
  }

  async waitForPageLoad() {
    await this.body.waitFor({ state: 'visible' });
  }
}
