import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"
import { productPageLink } from "../utils/constants";

test.describe('Cart Modal', () => {
  test.beforeEach(async({page}) => {
    await goto(page, productPageLink)
  })

  test('No product in cart displayed on modal when cart empty', async({ productPage, page}) => {
    await productPage.cartIcon.first().click();

    let noProductMsg = page.locator('p')
      .filter({ hasText: 'No products in the cart.' })
      .first()

    await expect(noProductMsg).toBeAttached();
  })

  test('Continue shopping button displayed on modal when cart empty', async({ productPage }) => {
    await productPage.cartIcon.first().click();

    await expect(productPage.continueShoppingButton).toBeVisible();
  })

  test('Check out button displayed on modal when cart have item', async({ productPage }) => {
    await productPage.addItemToCart("1");

    await productPage.cartIcon.first().click();

    await expect(productPage.checkOutButton).toBeVisible();
  })

  test('View Cart button displayed on modal when cart have item', async({productPage, page}) => {
    await productPage.quantityInput.fill("1")
    await productPage.addToCartButton.click();
    await productPage.cartIcon.first().click();

    await expect(productPage.viewCartModal).toBeVisible();
  })
})
