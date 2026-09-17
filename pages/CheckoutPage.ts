import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    private readonly confirmOrder: Locator;
    private readonly orderSuccess: Locator;

    constructor(page: Page) {
        super(page);
        this.confirmOrder = page.locator('button[name="confirm_order"]');
        this.orderSuccess = page.locator('div[id="box-order-success"]');
    }

    async verifyAndConfirmOrder(priceValue: string, countGoods: number) {
        expect(this.page.locator('p').filter({ hasText: priceValue })).toBeVisible();
        expect(this.page.locator(`input[name="quantity"][value="${countGoods}"]`)).toBeVisible();
        await this.confirmOrder.click();
    }

    getOrderSuccessElement() {
        return this.orderSuccess;
    }
}
