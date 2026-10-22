import {test, expect} from "../fixtures/pages"
import { goto } from "../utils/helper"
import { productName } from "../utils/constants";

test.describe('Verify Product Details', () => {
  test.beforeEach(async({ page }) => {
    await goto(page, 
      `https://websitedemos.net/electronic-store-04/product/btu-115v-window-mounted-air-conditioner-with-remote-control-white/?customize=template`);
  })

  test("Verify product name corresponding selected product", 
    async({productPage}) => {
      await expect(productPage.title).toContainText(productName);
  })

  test("Verify product description corresponding selected product", 
    async({productPage}) => {
      await expect(productPage.description).toContainText("Lorem");
  })

  test("Verify product price corresponding selected product", 
    async({productPage}) => {
      expect(await productPage.getProductPrice()).toBe("179.00");
  })

  test("Verify product image being loaded", 
    async({ productPage}) => {
      await expect(productPage.img).toBeVisible();

      const loaded = await productPage.img.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
      )

      expect(loaded).toBeTruthy();
  })

  test("Verify product quantity is displayed", 
    async({productPage}) => {
      expect(await productPage.quantity.inputValue())
        .not
        .toBe('')
  })

  test("Verify add to cart button is clickable", 
    async({ productPage}) => {
      await expect(productPage.addToCartButton).toBeEnabled();
  })
})
