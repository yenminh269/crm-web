import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly noProducts : Locator;
  readonly spanText : Locator;

  constructor(page : Page ) {
    this.noProducts = page.locator('article img');
    this.spanText = page.locator('h1 span');
  }

  async getNoProducts() : Promise<number> {
    const results = await this.noProducts.count();

    console.log("Returned number of products " + results);

    return results;
  }
}
