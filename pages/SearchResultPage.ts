import { Page, Locator } from "@playwright/test";

export class SearchResultPage {
  readonly noProducts : Locator;
  readonly notFoundMsg: Locator;
  readonly activeProducts : Locator;
  readonly pageTitle : Locator;

  constructor(page : Page ) {
    this.noProducts = page.locator('article img');
    this.notFoundMsg = page.locator('section.not-found');
    this.activeProducts = page.getByRole('link', { name: 'Leave a Comment' });
    this.pageTitle = page.getByRole('heading', { name: 'Search Results for:' });
  }

  async getActiveProductCount() : Promise<number> {
    return await this.activeProducts.count()
  }

  async getNoProducts() : Promise<number> {
    const result = await this.noProducts.count();
    console.log("Returned number of products: " + result);

    return result;
  }
}
