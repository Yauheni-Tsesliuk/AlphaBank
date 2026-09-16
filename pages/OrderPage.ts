import { type Page, type Locator } from '@playwright/test';
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

    async selectGoods(itemValue:string){


    this.page.locator(`a.link[title="${itemValue}"]`).first().click();
    this.quantity.fill('33');
    this.addToCart.click()
    this.cart.click();
  }
}




  