import { Locator, Page } from "@playwright/test";
export class HomePage {
  readonly searchBar : Locator;
  readonly searchButton : Locator;

  constructor(page : Page){
    this.searchBar = page.locator('input[type="search"]');
    this.searchButton = page.locator("button[value='Search']");
  }

  async searchProduct(product : string) : Promise<void>{
    await this.searchBar.fill(product);

    await this.searchButton.click();

    console.log("Searching products");
  }
}