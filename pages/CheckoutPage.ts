import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    private readonly confirmOrder: Locator;
    private readonly orderSuccess: Locator;

    constructor(page: Page) {
        super(page);
        this.confirmOrder = page.locator('button[name="confirm_order"]');
        this.orderSuccess = page.locator('div[id="box-order-success"]');
    }

    async verifyAndConfirmOrder() {
        await this.confirmOrder.click();
    }

    getOrderSuccessElement() {
        return this.orderSuccess;
    }
}




