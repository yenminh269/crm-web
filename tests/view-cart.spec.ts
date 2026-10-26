import {test, expect } from "../fixtures/pages"
import { goto, addItemToCart } from "../utils/helper"

test.describe('View Cart', () => {
  test.beforeEach(async({ page }) => {
    await goto(page, 
      `https://websitedemos.net/electronic-store-04/product/btu-115v-window-mounted-air-conditioner-with-remote-control-white/?customize=template`);
    })
  

  test('Item subtotal is calculated correctly when add 1 Window-Mounted', 
    async({cartPage, productPage }) => {
    await addItemToCart(productPage);

    await productPage.viewCartButton.click();

    let expected = await cartPage.getItemPrice() * await cartPage.getItemQuantity();
    
    expect(expected).toEqual(await cartPage.getItemSubtotal());
  })

  test('Item subtotal is calculated correctly when add 3 Window-Mounted', 
    async({cartPage, productPage}) => {
    await productPage.quantityInput.fill("3");
    await addItemToCart(productPage);

    await productPage.viewCartButton.click();

    let expected = await cartPage.getItemPrice() * await cartPage.getItemQuantity();
    
    expect(expected).toEqual(await cartPage.getItemSubtotal());
  })

  test(`Cart subtotal is calculated correctly when add 2 Window-Mounted, 1 Dual Hose`, 
    async({cartPage, productPage}) => {
    await productPage.quantityInput.fill("2"); //add 2 window
    await addItemToCart(productPage);

    //navigate to Dual Hose
    const dualHose = productPage.relatedProduct.filter({
        hasText: 'Dual Hose'
      });

      await dualHose.click();

    await productPage.quantityInput.fill("1")
    await addItemToCart(productPage);

    await productPage.viewCartButton.click();

    let expected = await cartPage.getItemPrice() * await cartPage.getItemQuantity();

    let cartSubtotal = cartPage.cartSubtotal.last();
    let result = Number(cartSubtotal.locator('bdi').textContent());
    
    expect(expected).toEqual(result);
  })

  //remove product

  test("Checkout button is displayed", async({cartPage}) => {
    expect(cartPage.checkOutButton).toBeVisible();
  })

  test("Coupon is displayed", async({cartPage}) => {
    expect(cartPage.couponButton).toBeVisible();
  })
})
