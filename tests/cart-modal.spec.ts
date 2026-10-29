import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"
import { productPageLink } from "../utils/constants";

test.describe('Cart Modal', () => {
  test.beforeEach(async({page}) => {
    await goto(page, productPageLink)
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
    await productPage.addItemToCart();

    await productPage.cartIcon.first().click();

    let expected = page.getByRole('link', { name: 'Checkout' })

    await expect(expected).toBeVisible();
  })

  test('View Cart button displayed on modal when cart have item', async({productPage, page}) => {
    await productPage.addItemToCart();

    await productPage.cartIcon.first().click();

    let expected = page.getByRole('link', { name: 'View cart' })

    await expect(expected).toBeVisible();
  })
})
