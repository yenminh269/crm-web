import { Page } from "@playwright/test"
import { ProductPage } from "../pages/ProductPage";
import { expect } from "@playwright/test";

export async function goto(page : Page, url : string) : Promise<void> {
  await page.goto(`${url}`);

  console.log("Navigated to the website");
}


