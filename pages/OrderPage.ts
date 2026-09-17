import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderPage extends BasePage {
    private readonly quantity: Locator;
    private readonly cart: Locator;
    private readonly addToCart: Locator;

    constructor(page: Page) {
        super(page);
        this.quantity = page.locator('input[name="quantity"]');
        this.cart = page.locator('div[id="cart"]');
        this.addToCart = page.locator('button[name="add_cart_product"]');
    }

    async selectGoods(itemValue: string, quantityValue: number) {
        await this.page.locator(`a.link[title="${itemValue}"]`).first().click();

        // Ожидаем загрузки страницы товара
        await this.quantity.waitFor({ state: 'visible' });
        await this.quantity.fill(quantityValue.toString());

        await this.addToCart.click();

        // Ожидаем обновления количества товаров в корзине
        await this.page.locator('div#cart a.content span.quantity').waitFor({ state: 'visible', timeout: 10000 });

        // Дополнительное ожидание для завершения обновления корзины
        await this.page.waitForTimeout(1000);

        await this.cart.click();
    }
}
