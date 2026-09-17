import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderPage extends BasePage {
    private readonly stickerSale: Locator;
    private readonly campaignPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.stickerSale = page.locator('div[class="sticker sale"]');
        this.campaignPrice = page.locator('.campaign-price');
    }

    async selectFirstSaleGoods(quantityValue: number) {
        await this.stickerSale.first().click();
        // Ожидаем загрузки страницы товара
        await this.quantity.waitFor({ state: 'visible' });
        // Выбираем размер ДО заполнения количества
        const sizeSelect = this.page.locator('select[name="options[Size]"]');
        if (await sizeSelect.count() > 0) {
            await sizeSelect.selectOption('Small');
        }
        await this.quantity.fill(quantityValue.toString());
        const campaignPrice = await this.campaignPrice.first().textContent();
        await this.addToCart.click();
        // Ожидаем обновления количества товаров в корзине
        await this.page.locator('div#cart a.content span.quantity').waitFor({ state: 'visible', timeout: 10000 });
        // Дополнительное ожидание для завершения обновления корзины
        await this.page.waitForTimeout(1000);
        await this.cart.click();
        return campaignPrice;
    }
}
