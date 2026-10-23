import {test, expect } from "../fixtures/pages"
import { goto, addItemToCart } from "../utils/helper"

test.describe('Add to Cart functionality', () => {
  test.beforeEach(async({ page }) => {
      await goto(page, 
        `https://websitedemos.net/electronic-store-04/product/btu-115v-window-mounted-air-conditioner-with-remote-control-white/?customize=template`);
  })

  test('Cart count = 1 when clicking add to cart', async({productPage}) => {
      await addItemToCart(productPage);

      await expect(productPage.noItemInCart.first()).toHaveAttribute('data-cart-total', '1');
  })

  test(`Validation message displayed when enter a quantity = 0`, async({productPage}) => {
      await productPage.quantityInput.fill("0")

      await productPage.addToCartButton.click();

      await expect(productPage.quantityInput).toHaveJSProperty(
        'validity.rangeUnderflow', true
      )
  })

  test(`Verify cart count = 5 when enter a quantity & add to cart`, async({productPage}) => {
      await productPage.quantityInput.fill("5")

      await addItemToCart(productPage);

      await expect(productPage.noItemInCart.first()).toHaveAttribute('data-cart-total', '5');
  })
})

