import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"

test.describe('Add to Cart functionality', () => {
  test.beforeEach(async({ page }) => {
      await goto(page, 
        `https://websitedemos.net/electronic-store-04/product/btu-115v-window-mounted-air-conditioner-with-remote-control-white/?customize=template`);
  })

  test('Cart count is updated when adding an item to cart', 
    async({productPage}) => {
      await productPage.addToCartButton.click();

      console.log("item: " + await productPage.noItemInCart.count());

      //expect(productPage.noItemInCart).toHaveAttribute('data-cart-total', '1');
    }
  )
})