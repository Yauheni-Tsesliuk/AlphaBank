import { type Page, type Locator } from '@playwright/test';

export class BasePage {
  protected readonly quantity: Locator;
  protected readonly cart: Locator;
  protected readonly addToCart: Locator;
  protected readonly price: Locator;

  constructor(protected page: Page) {
    this.quantity = page.locator('input[name="quantity"]');
    this.cart = page.locator('div[id="cart"]');
    this.addToCart = page.locator('button[name="add_cart_product"]');
    this.price = page.locator('span[class="price"]');
  }

  async goto(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async selectGoods(itemValue: string, quantityValue: number) {
    await this.page.locator(`a.link[title="${itemValue}"]`).first().click();
    // Ожидаем загрузки страницы товара
    await this.quantity.waitFor({ state: 'visible' });
    await this.quantity.fill(quantityValue.toString());
    const price = await this.price.first().textContent();
    await this.addToCart.click();
    // Ожидаем обновления количества товаров в корзине
    await this.page.locator('div#cart a.content span.quantity').waitFor({ state: 'visible', timeout: 10000 });
    // Дополнительное ожидание для завершения обновления корзины
    await this.page.waitForTimeout(1000);
    await this.cart.click();
    return price;
  }
}
