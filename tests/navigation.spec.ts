import {test, expect} from "../fixtures/pages"
import { goto } from "../utils/helper"
import { productName, category, homePageLink } from "../utils/constants";

test.describe('Verify Product Details', () => {
  test.beforeEach(async({ page }) => {
      await goto(page, homePageLink);
    })

  test('User can navigate from Home to View product details page', async({homePage, productCategoryPage, productPage}) => {
    await homePage.viewProduct(category);

    await productCategoryPage.viewProductDetails(productName);

    await expect(productPage.title).toBeVisible();
  })
})