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
    const  quantityValue = 3;
    const selectedPrice = await orderPage.selectGoods('Blue Duck',  quantityValue);
    const price = selectedPrice ? selectedPrice : '$0';
    await checkoutPage.verifyAndConfirmOrder(price,  quantityValue);
    await expect(checkoutPage.getOrderSuccessElement()).toBeVisible();
  });

  test('Order of a single item with a discount', async ({ page }) => {
    const { email, password } = testUsers.defaultUser;
    await homePage.login(email, password);
    const  quantityValue = 2;
    const selectedPrice = await orderPage.selectFirstSaleGoods( quantityValue);
    const price = selectedPrice ? selectedPrice : '$0';
    await checkoutPage.verifyAndConfirmOrder(price,  quantityValue);
    await expect(checkoutPage.getOrderSuccessElement()).toBeVisible();
  });

  test.only('Order without login', async ({ page }) => {
   const  quantityValue = 3;
    await orderPage.selectGoods('Blue Duck',  quantityValue);
    await homePage.clickLogo();
    await orderPage.selectGoods('Red Duck',  quantityValue);



     await page.waitForTimeout(20000); 
  });

});