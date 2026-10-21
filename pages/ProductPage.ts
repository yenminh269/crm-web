import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly noProducts : Locator;
  readonly notFoundMsg: Locator;
  readonly activeProducts : Locator;
  readonly pageTitle : Locator;
  readonly productHeader : Locator;

  constructor(page : Page ) {
    this.noProducts = page.locator('article img');
    this.notFoundMsg = page.locator('section.not-found');
    this.activeProducts = page.getByRole('link', { name: 'Leave a Comment' });
    this.pageTitle = page.getByRole('heading', { name: 'Search Results for:' });
    this.productHeader = page.locator('ul h2');
  }

  async getNoProducts() : Promise<number> {
    const result = await this.noProducts.count();

    console.log("Returned number of products: " + result);

    return result;
  }

  async getProductPrice(name : string, page : Page) : Promise<any> {
    const product = page.locator('ul.products li div').filter({
      has: page.locator('h2', {  hasText: name })
    });

    const productPrice = await product.locator('span bdi').textContent();
    const value = productPrice?.replace('$', '');

    console.log("Product price: " + value);

    return value;
  }
}
