import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly itemPrice : Locator;
  readonly itemQuantity : Locator;
  readonly itemSubtotal : Locator;
  readonly checkOutButton : Locator;
  readonly couponButton : Locator;
  readonly cartSubtotal : Locator;

  constructor(page : Page) {
    this.itemSubtotal = page.locator(".product-subtotal bdi");
    this.itemPrice = page.locator(".product-price bdi");
    this.itemQuantity = page.locator("input[aria-label*='Product quantity']");
    this.checkOutButton = page.locator(".checkout-button");
    this.couponButton = page.locator("#ast-coupon-trigger");
    this.cartSubtotal = page.locator("td[data-title$='Subtotal']");
  }

  async getItemPrice() : Promise<number> {
    let val = await this.itemPrice.textContent();
    console.log("Item price: " + val);

    let result : number = Number(val);
   
    return result;
  }

  async getItemQuantity() : Promise<number> {
    let val = await this.itemQuantity.getAttribute('value');
    console.log("Item quantity: " + val);

    let result : number = Number(val);
    return result;
  }

  async getItemSubtotal() : Promise<number> {
    let val = await this.itemSubtotal.textContent();
    console.log("Item subtotal: " + val);

    let result : number = Number(val);
    return result;
  }
}
