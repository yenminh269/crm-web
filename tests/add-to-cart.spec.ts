import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"
import { productPageLink } from "../utils/constants";

test.describe('Add to Cart functionality', () => {
  test.beforeEach(async({page}) => {
    await goto(page, productPageLink)
  })

  test('Cart count = 1 when add 1 Window-Mounted', async({productPage}) => {
    await productPage.addItemToCart();

    await expect(productPage.noItemInCart.first()).toHaveAttribute('data-cart-total', '1');
  })

  test(`Validation message displayed when enter an invalid quantity`, async({productPage}) => {
    await productPage.quantityInput.fill("0")

    await productPage.addToCartButton.click();

    await expect(productPage.quantityInput).toHaveJSProperty('validity.rangeUnderflow', true)
  })

  test(`Cart count = 5 updated when add 5 Window-Mounted`, async({productPage}) => {
    await productPage.quantityInput.fill("5")

    await productPage.addItemToCart();

    await expect(productPage.noItemInCart.first()).toHaveAttribute('data-cart-total', '5');
  })

  test(`Cart count = 3 when add 2 Window-Mounted, 1 Dual Hose`, async({productPage}) => {
    await productPage.quantityInput.fill("2")
    await productPage.addItemToCart();

      //navigate to Dual Hose
      const dualHose = productPage.relatedProduct.filter({
        hasText: 'Dual Hose'
      });

      await dualHose.click();

      await productPage.quantityInput.fill("1")
      await productPage.addItemToCart();

      await expect(productPage.noItemInCart.first()).toHaveAttribute('data-cart-total', '3');
  })
})

