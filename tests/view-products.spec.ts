import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"
import { homePageLink } from "../utils/constants";

test.describe('View product by category', () => {
  const category = "air conditioner"; 

  test.beforeEach(async({ page }) => {
    await goto(page, homePageLink);
  })

  test("Name corresponding its category", async({ homePage, productCategoryPage }) => {
    await homePage.viewProduct(category);

    let name = await productCategoryPage.getHeader();

    expect(name?.toLowerCase()).toBe(category.toLowerCase());
  })

  test("Description being displayed", async({ homePage, productCategoryPage }) => {
    await homePage.viewProduct(category);

    await expect(productCategoryPage.description).toBeVisible();
  })

  test('No.product models displayed corresponding its category', async({ homePage, productCategoryPage }) => {
    await homePage.viewProduct(category);

    expect(await productCategoryPage.getNoProduct()).toBe(4);
  })
})
