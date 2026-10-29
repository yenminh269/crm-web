import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly placeOrder : Locator;
  readonly billingHeading : Locator;
  readonly page : Page;

  constructor(page : Page){
    this.billingHeading = page.locator('#billing_fields_heading')
    this.placeOrder = page.locator("#place_order");
    this.page = page;
  }

  async findErrorMsg(msg : string) : Promise<Locator> {
    const item = this.page.locator('ul.woocommerce-error li').filter({
      hasText: msg
    })
    return item;
  }
}