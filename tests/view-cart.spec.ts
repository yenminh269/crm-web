import {test, expect } from "../fixtures/pages"
import { goto, addItemToCart } from "../utils/helper"

test.describe('View Cart', () => {
  test.beforeEach(async({ page }) => {
      await goto(page, 
        `https://websitedemos.net/electronic-store-04/product/btu-115v-window-mounted-air-conditioner-with-remote-control-white/?customize=template`);
  })

  test('No product in cart displayed on modal when cart empty', async({productPage, page}) => {
    await productPage.cartIcon.first().click();

    let expected = page.locator('p').filter({ hasText: 'No products in the cart.' }).first();

    await expect(expected).toBeAttached();
  })

  test('Continue shopping button displayed on modal when cart empty', async({productPage, page}) => {
    await productPage.cartIcon.first().click();

    let expected = page.getByRole('link', { name: 'Continue Shopping' })

    await expect(expected).toBeVisible();
  })

  test('Check out button displayed on modal when cart have item', async({productPage, page}) => {
    await addItemToCart(productPage);

    await productPage.cartIcon.first().click();

    let expected = page.getByRole('link', { name: 'Checkout' })

    await expect(expected).toBeVisible();
  })
})
