import { Locator, Page } from "@playwright/test";
export class HomePage {
  readonly searchBar : Locator;
  readonly searchButton : Locator;
  readonly productByCategoryLink : Locator;

  constructor(page : Page){
    this.searchBar = page.locator('input[type="search"]');
    this.searchButton = page.locator("button[value='Search']");
    this.productByCategoryLink = page.locator('.product-category');
  }

  async searchProduct(product : string) : Promise<void>{
    await this.searchBar.fill(product);

    await this.searchButton.click();

    console.log("Searching products");
  }

  async viewProduct(categoryChoice : string, page : Page) : Promise<void> {
    const formattedChoice = categoryChoice[0].toUpperCase() + categoryChoice.slice(1);

    const category = page.locator('.product-category a').filter({
      has: page.locator(`img[alt="${formattedChoice}"]`)
    });
  
    await category.click();

    console.log("A category is clicked");
  }
}