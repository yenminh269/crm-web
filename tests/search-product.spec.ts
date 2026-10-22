import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"

test.describe("Search product behavior", () => {
  test.beforeEach(async({ page }, testInfo) => {
    let url = testInfo.project.use.baseURL;
    
    await goto(page, `${url}`);
  })

  test('Verify system displays correct product when keyword case-insensitive partial match with product name', 
    async({ homePage, searchResultPage }) => {
    await homePage.searchProduct("TV");

    expect(await searchResultPage.getNoProducts()).toBe(3);
  })

  test('Verify system displays correct product when keyword case-insensitive exact match with product name', 
    async({ homePage, searchResultPage }) => {
    await homePage.searchProduct("X80J 55 Inch TV: 4K Ultra HD LED Smart Google TV with Dolby Vision HDR");

    expect(await searchResultPage.getNoProducts()).toBe(1);
  })

  test('Verify system displays messagge keyword do not match with product name', 
    async({homePage, searchResultPage}) => {
    await homePage.searchProduct("abc");

    const notFoundMsg = 
      `Sorry, but nothing matched your search terms. 
      Please try again with some different keywords.`;

    await expect(searchResultPage.notFoundMsg).toContainText(notFoundMsg);
  })

  test('Verify system displays active products with empty keyword', 
    async({homePage, searchResultPage}) => {
    await homePage.searchProduct("");
   
    await expect(searchResultPage.pageTitle).toBeVisible();

    expect(await searchResultPage.activeProducts.count()).toBeGreaterThan(0);
  })
})
