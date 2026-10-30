import { Locator, Page, expect } from "@playwright/test";
import { formartPrice } from "../utils/helper";
export class CartPage {
  readonly itemPrice : Locator;
  readonly itemQuantity : Locator;
  readonly itemSubtotal : Locator;
  readonly checkOutButton : Locator;
  readonly couponButton : Locator;
  readonly couponInput : Locator
  readonly applyCouponButton : Locator
  readonly cartSubtotal : Locator;
  readonly msg : Locator
  readonly cartHeader : Locator
  readonly cartItem : Locator
  readonly page : Page

  constructor(page : Page) {
    this.itemSubtotal = page.locator(".product-subtotal bdi");
    this.itemPrice = page.locator(".product-price bdi");
    this.itemQuantity = page.locator("input[aria-label*='Product quantity']");
    this.checkOutButton = page.locator(".checkout-button");
    this.couponButton = page.locator("#ast-coupon-trigger");
    this.couponInput = page.locator('#ast-coupon-code')
    this.applyCouponButton = page.locator('#ast-apply-coupon')
    this.cartSubtotal = page.locator("td[data-title$='Subtotal']");
    this.msg = page.locator('.woocommerce-message')
    this.cartHeader = page.locator('h1:has-text("Cart")')
    this.cartItem =  page.locator('tr.cart_item');
    this.page = page;
  }

  async checkOut() : Promise<void> {
    await this.checkOutButton.click()
  }

  async getRemovedMsg(productName : string) : Promise<Locator> {
    await this.page.locator(`td.product-remove a[aria-label*="${productName}"]`).click()
    
    return this.msg.filter({ hasText: productName })
  }

  async applyCoupon(code : string) : Promise<void> {
    await this.couponButton.click();
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
  }

  async getAllItemSubtotal() : Promise<number>{
    await expect(this.cartHeader).toBeVisible()

    let noItems = Number(await this.cartItem.count());

    console.log("Cart has: " + noItems);

    let itemPrice, itemQuantity, sum = 0, priceText

    for(let i = 0; i< noItems; i++){
      priceText = await  this.cartItem.nth(i).locator('td.product-price bdi').textContent();
      itemPrice = await formartPrice(priceText)

      itemQuantity = Number(await this.cartItem.nth(i).locator('td input[aria-label*="Product quantity"]').getAttribute('value'));
      
      console.log("Item price: " + itemPrice);
      console.log("Item quantity: " + itemQuantity);

      sum += itemPrice * itemQuantity;
    }
  
    console.log("Item subtotal: " + sum )
    return sum;
  }

  async getItemSubtotal() : Promise<number> {
    let val = await this.itemSubtotal.textContent();
    console.log("Item subtotal: " + val);

    return await formartPrice(val);
  }
}
