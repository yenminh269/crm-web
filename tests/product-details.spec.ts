import {test, expect} from "../fixtures/pages"
import { goto } from "../utils/helper"
import { productName, productPageLink } from "../utils/constants";

test.describe('Verify Product Details', () => {
  test.beforeEach(async({ page }) => {
    await goto(page, productPageLink) 
  })

  test("Product name corresponding selected product", async({productPage}) => {
    await expect(productPage.title).toContainText(productName);
  })

  test("Product description corresponding selected product", async({productPage}) => {
    await expect(productPage.description).toContainText("Lorem");
  })

  test("Product price corresponding selected product", async({productPage}) => {
    expect(await productPage.getProductPrice()).toBe("179.00");
  })

  test("Product image being loaded", async({ productPage}) => {
    await expect(productPage.img).toBeVisible();

    const loaded = await productPage.img.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
      )

    expect(loaded).toBeTruthy();
  })

  test("Product quantity is displayed", async({productPage}) => {
    expect(await productPage.quantity.inputValue())
      .not
      .toBe('')
  })

  test("Add to cart button is clickable", async({ productPage}) => {
    await expect(productPage.addToCartButton).toBeEnabled();
  })
})
