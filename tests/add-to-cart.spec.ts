import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"
import { homePageLink, productA, productB } from "../utils/constants";

test.describe('Add to Cart functionality', () => {
  test.beforeEach(async({page}) => {
    await goto(page, homePageLink)
  })

  test(`Validation message displayed when enter an invalid quantity`, async({productPage}) => {
    await productPage.openProduct(productA.url)
    await productPage.addItemToCart("0")

    await expect(productPage.quantityInput).toHaveJSProperty('validity.rangeUnderflow', true)
  })

  test('Cart count = 1 when 1 unit of a product is added', async({productPage}) => {
    await productPage.openProduct(productA.url)
    await productPage.addItemToCart("1")

    await expect(productPage.noItemInCart.first()).toHaveAttribute('data-cart-total', '1');
  })

  test(`Cart count = 5 when 5 units of a product are added`, async({productPage}) => {
    await productPage.openProduct(productA.url)
    await productPage.addItemToCart("5")

    await expect(productPage.noItemInCart.first()).toHaveAttribute('data-cart-total', '5');
  })

  test(`Cart count = 3 when 3 different products are added`, async({productPage}) => {
    await productPage.openProduct(productA.url)
    await productPage.addItemToCart("2")
    await expect(productPage.viewCartButton).toBeVisible({timeout: 10000});

    await productPage.openProduct(productB.url)
    await productPage.addItemToCart("1")

    await expect(productPage.noItemInCart.first()).toHaveAttribute('data-cart-total', '3');
  })
})

