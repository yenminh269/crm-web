import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"
import { category } from "../utils/constants";

test.describe('View product by category', () => {
  test.beforeEach(async({ page }, testInfo) => {
    let url = testInfo.project.use.baseURL;
    
    await goto(page, `${url}`);
  })

  test('Verify name corresponding its category', 
    async({ homePage, productCategoryPage }) => {
    await homePage.viewProduct(category);

    let expected = await productCategoryPage.header.textContent();

    expect(expected?.toLowerCase()).toBe(category.toLowerCase());
  })

  test('Verify description being displayed', 
    async({ homePage, productCategoryPage }) => {
    await homePage.viewProduct(category);

    await expect(productCategoryPage.description).toBeVisible();
  })

  test('Verify no.product models displayed corresponding its category', 
    async({ homePage, productCategoryPage }) => {
    await homePage.viewProduct(category);

    expect(await productCategoryPage.noProducts.count()).toBe(4);
  })
})
