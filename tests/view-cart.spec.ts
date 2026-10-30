import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"
import { productPageLink, productName } from "../utils/constants"

test.describe('View Cart', () => {
  test.beforeEach(async({ page }) => {
    await goto(page, productPageLink)
  })
  
  test('Item subtotal is calculated correctly when add 1 Window-Mounted', 
    async({cartPage, productPage }) => {
    await productPage.addItemToCart("1")
   
    expect(await cartPage.getItemSubtotal()).toBe(179.00);
  })

  test('Item subtotal is calculated correctly when add 3 Window-Mounted', 
    async({cartPage, productPage}) => {
    await productPage.addItemToCart("3")

    expect(await cartPage.getItemSubtotal()).toBe(537.00);
  })

  test(`Cart subtotal is calculated correctly when add 2 Window-Mounted, 1 Dual Hose`, 
    async({cartPage, productPage}) => {
    await productPage.quantityInput.fill("2"); 
    await productPage.addToCartButton.click();
    await expect(productPage.viewCartButton).toBeVisible({timeout: 10000});

    const dualHose = productPage.relatedProduct.filter({ hasText: 'Dual Hose'});
    await dualHose.click();
    await productPage.addItemToCart("1")

    expect(await cartPage.getAllItemSubtotal()).toBe(507.00);
  })

  test("Message displayed when product removed", async({productPage, cartPage}) => {
    await productPage.addItemToCart("1")

    await expect(await cartPage.getRemovedMsg(productName)).toBeVisible()
  })

  test("Checkout button is displayed", async({cartPage, productPage}) => {
    await productPage.addItemToCart("1")
    
    await expect(cartPage.checkOutButton).toBeVisible();
  })

  test("Coupon button is displayed", async({cartPage, productPage}) => {
    await productPage.addItemToCart("1")

    await expect(cartPage.couponButton).toBeVisible();
  })

  test("Coupon error msg is displayed when coupon invalid", async({cartPage, productPage, page}) => {
    await productPage.addItemToCart("1")

    const coupon = "abc";
    await cartPage.applyCoupon(coupon)

    await expect(
      page.getByText(`Coupon "${coupon}" cannot be applied because it does not exist.`))
      .toBeVisible();
  })
})
