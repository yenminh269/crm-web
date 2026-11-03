import {test, expect} from "../fixtures/pages"
import { goto } from "../utils/helper"
import { productName, productPageLink } from "../utils/constants";
import  dotenv from 'dotenv';

dotenv.config();

test.describe('Verify Product Details', () => {
  test.beforeEach(async({ page }) => {
    await goto(page, process.env.PRODUCT_URL || productPageLink) 
  })

  test("Product name corresponding selected product", async({productPage}) => {
    await expect(productPage.title).toContainText(productName);
  })

  test("Product description corresponding selected product", async({productPage}) => {
    await expect(productPage.description).toContainText("Lorem");
  })

  test("Product price corresponding selected product", async({productPage}) => {
    expect(await productPage.getProductPrice()).toBe(179);
  })

  test("Product image being loaded", async({ productPage}) => {
    expect(await productPage.getImage()).toBeTruthy();
  })

  test("Product quantity is displayed", async({productPage}) => {
    expect(await productPage.getQuantity()).not.toBe('')
  })

  test("Add to cart button is clickable", async({ productPage}) => {
    await expect(productPage.addToCartButton).toBeEnabled();
  })
})
