import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"
import { homePageLink } from "../utils/constants";
import dotenv from 'dotenv';

dotenv.config();

test.describe('View product by category', () => {
  const category = "air conditioner"; 

  test.beforeEach(async({ page }) => {
    await goto(page, process.env.HOMEPAGE_URL || homePageLink);
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
