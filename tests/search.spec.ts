import {test, expect } from "../fixtures/pages"
import { goto } from "../utils/helper"

test.describe("Search product", () => {

  test.beforeEach(async({ page }, testInfo) => {
    let url = testInfo.project.use.baseURL;
    
    await goto(page, `${url}`);
  })

  test('keyword case-insensitive partial match with product name', async({ homePage, productPage }) => {
    await homePage.searchProduct("TV");

    expect(await productPage.getNoProducts()).toBe(3);
  })

  test('keyword case-insensitive exact match with product name', async({ homePage, productPage }) => {
    await homePage.searchProduct("X80J 55 Inch TV: 4K Ultra HD LED Smart Google TV with Dolby Vision HDR");

    expect(await productPage.getNoProducts()).toBe(1);
  })

  test('keyword do not match with product name', async({homePage, productPage}) => {
    await homePage.searchProduct("abc");

    expect(await productPage.getNoProducts()).toBe(0)
  })

  test('empty keyword', async({homePage, page}) => {
    await homePage.searchProduct("");

    await expect(page.locator('h1 span')).toHaveText("");
  })
})
