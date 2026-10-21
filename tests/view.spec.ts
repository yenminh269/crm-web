import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"

test.describe('View product by category', () => {
  const category = "air conditioner";
  test.beforeEach(async({ page }, testInfo) => {
    let url = testInfo.project.use.baseURL;
    
    await goto(page, `${url}`);
  })

  test('Verify category name under selected category displayed', async({ homePage, page }) => {
    await homePage.viewProduct(category, page);

    await expect(page.locator(`h1:has-text("${category}")`)).toBeVisible();
  })

  test('Verify category description under selected category displayed', async({ homePage, page }) => {
    await homePage.viewProduct(category, page);

    await expect(page.locator("div[class='term-description'] p")).toBeVisible();
  })

  test('Verify product price corresponding to the selected category displayed', 
      async({ homePage, productPage, page }) => {
    const productName = "Window-Mounted";

    await homePage.viewProduct(category, page);

    let price = await productPage.getProductPrice(productName, page);

    expect(price).toBe("179.00");
  })
})
