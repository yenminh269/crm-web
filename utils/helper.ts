import { Page } from "@playwright/test"
import { ProductPage } from "../pages/ProductPage";
import { expect } from "@playwright/test";

export async function goto(page : Page, url : string) : Promise<void> {
  await page.goto(`${url}`);

  console.log("Navigated to the website");
}

export async function addItemToCart(productPage : ProductPage) : Promise<void> {
  await productPage.addToCartButton.click();
  
  await expect(productPage.viewCartButton).toBeVisible({timeout: 5000});
  
  console.log("Added item in cart");
}
