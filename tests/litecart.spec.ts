import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { OrderPage } from '../pages/OrderPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages';
import { testUsers } from '../test_data/users';
import { errors } from '../test_data/login_errors';

test.describe('LiteCart Store Tests', () => {
  let homePage: HomePage;
  let orderPage: OrderPage;
  let checkoutPage: CheckoutPage;
  let loginPage: LoginPage; 

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    orderPage = new OrderPage(page);
    checkoutPage = new CheckoutPage(page);
    loginPage = new LoginPage(page);

    await homePage.open();
    await expect(homePage.getCartQuantityLocator()).toHaveText('0');

  });

  test('Order of a single item without a discount', async ({ page }) => {
    const { email, password } = testUsers.defaultUser;
    await homePage.login(email, password);
    const quantityValue = 3;
    const selectedPrice = await orderPage.selectGoods('Blue Duck', quantityValue);
    const price = selectedPrice ? selectedPrice : '$0';
    await checkoutPage.verifyAndConfirmOrder(price, quantityValue);
    await expect(checkoutPage.getOrderSuccessElement()).toBeVisible();
  });

  test('Order of a single item with a discount', async ({ page }) => {
    const { email, password } = testUsers.defaultUser;
    await homePage.login(email, password);
    const quantityValue = 2;
    const selectedPrice = await orderPage.selectFirstSaleGoods(quantityValue);
    const price = selectedPrice ? selectedPrice : '$0';
    await checkoutPage.verifyAndConfirmOrder(price, quantityValue);
    await expect(checkoutPage.getOrderSuccessElement()).toBeVisible();
  });

  test('Order without login', async ({ page }) => {
    const quantityValue = 3;
    const ducks = ['Blue Duck', 'Red Duck'];
    for (const duck of ducks) {
      await homePage.selectGoods(duck, quantityValue);
      await homePage.clickLogo();
    }
    await homePage.checkRecentlyViewed(ducks);
  });

   test.only('Invalid Login', async ({ page }) => {
    await homePage.login('mhender@uspsp.top', '12345');
    loginPage.checkNoticeErrors(errors.invalidLogin);
  });

});