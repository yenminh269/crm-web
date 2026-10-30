import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly placeOrderButton : Locator;
  readonly billingHeading : Locator;
  readonly noteInput : Locator;
  readonly page : Page;

  constructor(page : Page){
    this.billingHeading = page.locator('#billing_fields_heading')
    this.placeOrderButton = page.locator("#place_order");
    this.noteInput = page.locator('textarea.input-text')
    this.page = page;
  }

  async placeOrder() : Promise<void> {
    await this.placeOrderButton.click();
  }

  async findErrorMsg(msg : string) : Promise<Locator> {
    return this.page.locator('ul.woocommerce-error li').filter({
      hasText: msg
    })
  }
}