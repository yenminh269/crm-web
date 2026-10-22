import { Locator, Page } from "@playwright/test";
export class HomePage {
  readonly searchBar : Locator;
  readonly searchButton : Locator;
  readonly productByCategoryLink : Locator;
  readonly page : Page;

  constructor(page : Page){
    this.searchBar = page.locator('input[type="search"]');
    this.searchButton = page.locator("button[value='Search']");
    this.productByCategoryLink = page.locator('.product-category a');
    this.page = page;
  }

  async searchProduct(product : string) : Promise<void>{
    await this.searchBar.fill(product);

    await this.searchButton.click();

    console.log("Searching products");
  }

  async viewProduct(categoryChoice : string) : Promise<void> {
    const formattedChoice = categoryChoice[0].toUpperCase() + categoryChoice.slice(1);

    const category = this.productByCategoryLink.filter({
      has: this.page.locator(`img[alt="${formattedChoice}"]`)
    });
  
    await category.click();

    console.log("A category is clicked");
  }
}