import { Page } from "@playwright/test"

export async function goto(page : Page, url : string) : Promise<void> {
  await page.goto(`${url}`);

  console.log("Navigated to the website");
}

export async function formartPrice(price : any) : Promise<number> {
  return Number(price?.replace('$', ''));
}


