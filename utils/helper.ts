import { Page } from "@playwright/test"

export async function goto(page : Page, url : string) : Promise<void> {
  await page.goto(`${url}`);

  console.log("Navigated to the website");
}
