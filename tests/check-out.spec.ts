import { test, expect } from "../fixtures/pages";
import { goto } from "../utils/helper";

test.describe('Check Out', () => {
  test.beforeEach( async({ page }) => {
      await goto(page, 
        `https://websitedemos.net/electronic-store-04/product/btu-115v-window-mounted-air-conditioner-with-remote-control-white/?customize=template`);
   
  })

  // test('Cart do not have items', async({page}) => {
  //   await expect(page.getByText('Your cart is currently empty.')).toBeVisible();
  // })

  test(`Email Address is required displayed when left blank`, 
    async({ page, productPage, cartPage, checkOutPage}) => {
    await productPage.addItemToCart();
    await productPage.viewCartButton.click();
    await cartPage.checkOutButton.click();

    await checkOutPage.placeOrder.click();

    const item = page.locator('ul.woocommerce-error li').filter({
      hasText: 'Billing Email address is a required field.'
    })

    await expect(item).toBeVisible();
  })

   test(`First name is required displayed when left blank`, 
    async({ page, productPage, cartPage, checkOutPage}) => {
    await productPage.addItemToCart();
    await productPage.viewCartButton.click();
    await cartPage.checkOutButton.click();

    await checkOutPage.placeOrder.click();

    const item = page.locator('ul.woocommerce-error li').filter({
      hasText: 'Billing First name is a required field.'
    })

    await expect(item).toBeVisible();
  })

   test(`Last name is required displayed when left blank`, 
    async({page, productPage, cartPage, checkOutPage}) => {
    await productPage.addItemToCart();
    await productPage.viewCartButton.click();
    await cartPage.checkOutButton.click();

    await checkOutPage.placeOrder.click();

    const item = page.locator('ul.woocommerce-error li').filter({
      hasText: 'Billing Last name is a required field.'
    })

    await expect(item).toBeVisible();
  })
})

