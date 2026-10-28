import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"

test.describe('View Cart', () => {
  test.beforeEach(async({ page }) => {
    await goto(page, 
      `https://websitedemos.net/electronic-store-04/product/btu-115v-window-mounted-air-conditioner-with-remote-control-white/?customize=template`);
    })
  
  test('Item subtotal is calculated correctly when add 1 Window-Mounted', 
    async({cartPage, productPage }) => {
    await productPage.addItemToCart();

    await productPage.viewCartButton.click();

    let expected = await cartPage.getItemPrice() * await cartPage.getItemQuantity();
    
    expect(await cartPage.getItemSubtotal()).toEqual(expected);
  })

  test('Item subtotal is calculated correctly when add 3 Window-Mounted', 
    async({cartPage, productPage}) => {
    await productPage.quantityInput.fill("3");
    await productPage.addItemToCart();

    await productPage.viewCartButton.click();

    let expected = await cartPage.getItemPrice() * await cartPage.getItemQuantity();
    
    expect(await cartPage.getItemSubtotal()).toEqual(expected);
  })

  test(`Cart subtotal is calculated correctly when add 2 Window-Mounted, 1 Dual Hose`, 
    async({cartPage, productPage}) => {
    //add 2 window
    await productPage.quantityInput.fill("2"); 
    await productPage.addItemToCart();

    //navigate to Dual Hose
    const dualHose = productPage.relatedProduct.filter({
        hasText: 'Dual Hose'
      });

    await dualHose.click();

    //add 1 Dual hose
    await productPage.quantityInput.fill("1")
    await productPage.addItemToCart();

    //view cart
    await productPage.viewCartButton.click();

    let result = await cartPage.getAllItemSubtotal();

    let num =  cartPage.cartSubtotal.last();
    let cartSubtotal = await num.locator('bdi').textContent();
    let expected = Number(cartSubtotal?.replace('$', ''))
    
    expect(result).toBe(expected);
  })

  //remove product

  test("Checkout button is displayed", async({cartPage, productPage}) => {
    await productPage.addItemToCart();

    await productPage.viewCartButton.click();
    await expect(cartPage.checkOutButton).toBeVisible();
  })

  test("Coupon button is displayed", async({cartPage, productPage}) => {
    await productPage.addItemToCart();

    await productPage.viewCartButton.click();

    await expect(cartPage.couponButton).toBeVisible();
  })
})
