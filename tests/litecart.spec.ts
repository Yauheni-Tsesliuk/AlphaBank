import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { OrderPage } from '../pages/OrderPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testUsers } from '../test_data/users';

test.describe('LiteCart Store Tests', () => {
  let homePage: HomePage;
  let orderPage: OrderPage;
  let checkoutPage: CheckoutPage;



  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    orderPage = new OrderPage(page);
    checkoutPage = new CheckoutPage(page);

    await homePage.open();
    await expect(homePage.getCartQuantityLocator()).toHaveText('0');

  });

  test('Order of a single item without a discount', async ({ page }) => {
    const { email, password } = testUsers.defaultUser;
    await homePage.login(email, password);
    const countGoods = 3;
    const selectedPrice = await orderPage.selectGoods('Blue Duck', countGoods);
    const price = selectedPrice ? selectedPrice : '$0';
    await checkoutPage.verifyAndConfirmOrder(price, countGoods);
    await expect(checkoutPage.getOrderSuccessElement()).toBeVisible();
  });

  test.only('Order of a single item with a discount', async ({ page }) => {
    const { email, password } = testUsers.defaultUser;
    await homePage.login(email, password);
    const countGoods = 2;
    const selectedPrice = await orderPage.selectFirstSaleGoods(countGoods);
    const price = selectedPrice ? selectedPrice : '$0';
    await checkoutPage.verifyAndConfirmOrder(price, countGoods);
    await expect(checkoutPage.getOrderSuccessElement()).toBeVisible();
  });
});