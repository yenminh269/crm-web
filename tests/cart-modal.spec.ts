import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"
import { productPageLink } from "../utils/constants";
import dotenv from 'dotenv';

dotenv.config();

test.describe('Cart Modal', () => {
  test.beforeEach(async({page}) => {
    await goto(page, process.env.PRODUCT_URL || productPageLink)
  })

  test('No product in cart displayed when cart empty', async({ productPage, page}) => {
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

  test('Check out button is hidden when cart is empty', async({ productPage }) => {
    await productPage.cartIcon.first().click();

    await expect(productPage.checkOutButton).not.toBeVisible();
  })

  test('Check out button displayed when cart have items', async({ productPage }) => {
    await productPage.addItemToCart("1");
    await productPage.cartIcon.first().click();

    await expect(productPage.checkOutButton).toBeVisible();
  })

  test('View Cart button displayed on modal when cart have items', async({productPage, page}) => {
    await productPage.addItemToCart("1");
    await productPage.cartIcon.first().click();

    await expect(productPage.viewCartModal).toBeVisible();
  })

  test('Continue shopping button is hidden when cart have items', async({ productPage }) => {
    await productPage.addItemToCart("1");
    await productPage.cartIcon.first().click();

    await expect(productPage.continueShoppingButton).not.toBeVisible();
  })
})
