import {Page, Locator} from '@playwright/test'

export class ProductCategoryPage {
  readonly description : Locator;
  readonly noProducts : Locator;
  readonly header : Locator;
  readonly page : Page;

  constructor(page : Page) {
    this.description = page.locator("div[class='term-description'] p");
    this.noProducts = page.locator("ul.products li");
    this.header = page.locator(`h1`);
    this.page = page;
  }

  async getNoProduct() : Promise<number> {
    return await this.noProducts.count()
  }

  async getHeader() : Promise<any> {
    return await this.header.textContent()
  }

  async viewProductDetails(name : string) : Promise<any> {
    const product = await this.getProductLocator(name);

    await product.locator('a').click();

    console.log("Product details displayed");
  }

  private async getProductLocator(name : string ) : Promise<Locator> {
    return this.page.locator('ul.products li div').filter({
      has: this.page.locator('h2', {  hasText: name })
    });
  }
}
