import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly placeOrder : Locator;
  readonly billingHeading : Locator;

  constructor(page : Page){
    this.billingHeading = page.locator('#billing_fields_heading')
    this.placeOrder = page.locator("#place_order");
  }
}