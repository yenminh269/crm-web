import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"
import { productPageLink, productName, productB } from "../utils/constants"

test.describe('View Cart', () => {
  test.beforeEach(async({ page }) => {
    await goto(page, productPageLink)
  })
  
  test('Item subtotal is calculated correctly when 1 unit of a product is added', 
    async({cartPage, productPage }) => {
    await productPage.addItemToCart("1")
   // await productPage.viewCart()
   
    expect(await cartPage.getItemSubtotal()).toBe(179.00);
  })

  test('Item subtotal is calculated correctly when 3 units of a product are added', 
    async({cartPage, productPage}) => {
    await productPage.addItemToCart("3")
    await productPage.viewCart()

    expect(await cartPage.getItemSubtotal()).toBe(537.00);
  })

  test(`Cart subtotal is calculated correctly when 2 different products are added`, 
    async({cartPage, productPage}) => {
    await productPage.addItemToCart("2")
    await expect(productPage.viewCartButton).toBeVisible({timeout: 10000});

    await productPage.openProduct(productB.url)
    await productPage.addItemToCart("1")
    await productPage.viewCart()

    expect(await cartPage.getAllItemSubtotal()).toBe(507.00);
  })

  test("Message displayed when a product is removed", async({productPage, cartPage}) => {
    await productPage.addItemToCart("1")
    await productPage.viewCart()
    
    await expect(await cartPage.getRemovedMsg(productName)).toBeVisible()
  })

  test("Checkout button is displayed", async({cartPage, productPage}) => {
    await productPage.addItemToCart("1")
    await productPage.viewCart()

    await expect(cartPage.checkOutButton).toBeVisible();
  })

  test("Coupon button is displayed", async({cartPage, productPage}) => {
    await productPage.addItemToCart("1")
    await productPage.viewCart()

    await expect(cartPage.couponButton).toBeVisible();
  })

  test("Coupon error msg is displayed when coupon invalid", async({cartPage, productPage, page}) => {
    await productPage.addItemToCart("1")
    await productPage.viewCart()

    const coupon = "abc";
    await cartPage.applyCoupon(coupon)

    await expect(page.getByText(`Coupon "${coupon}" cannot be applied because it does not exist.`))
      .toBeVisible();
  })

  test("Buy now button is displayed", async({cartPage, productPage}) => {
    await productPage.addItemToCart("1")
    await productPage.viewCart()

    await expect(cartPage.buyNowButton).toBeVisible();
  })

})
