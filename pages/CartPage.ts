import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
  readonly itemPrice : Locator;
  readonly itemQuantity : Locator;
  readonly itemSubtotal : Locator;
  readonly checkOutButton : Locator;
  readonly couponButton : Locator;
  readonly cartSubtotal : Locator;
  readonly page : Page

  constructor(page : Page) {
    this.itemSubtotal = page.locator(".product-subtotal bdi");
    this.itemPrice = page.locator(".product-price bdi");
    this.itemQuantity = page.locator("input[aria-label*='Product quantity']");
    this.checkOutButton = page.locator(".checkout-button");
    this.couponButton = page.locator("#ast-coupon-trigger");
    this.cartSubtotal = page.locator("td[data-title$='Subtotal']");
    this.page = page;
  }

  async getAllItemSubtotal() : Promise<number>{
    await expect(this.page.locator('h1:has-text("Cart")')).toBeVisible()

    let listOfItem = this.page.locator('tr.cart_item');

    let noItems = Number(await listOfItem.count());

    console.log("Cart has: " + noItems);

    let itemPrice, itemQuantity, sum = 0, priceText
    for(let i = 0; i< noItems; i++){
      priceText = await listOfItem.nth(i).locator('td.product-price bdi').textContent();
      itemPrice = Number(priceText?.replace('$', ''));
      itemQuantity = Number(await listOfItem.nth(i).locator('td input[aria-label*="Product quantity"]').getAttribute('value'));
      
      console.log("Item price: " + itemPrice);
      console.log("Item quantity: " + itemQuantity);

      sum += itemPrice * itemQuantity;
    }
  
    console.log("sum: " + sum )
    
    return sum;
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
