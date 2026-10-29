import { test, expect } from "../fixtures/pages";
import { productPageLink } from "../utils/constants";
import { goto } from "../utils/helper";

test.describe('Check Out', () => {
  test.beforeEach( async({ page, productPage, cartPage }) => {
    await goto(page, productPageLink)
    await productPage.addItemToCart();
    await productPage.viewCartButton.click();
    await cartPage.checkOutButton.click();
  })

  test("Email Address is required displayed when left blank", async({ page, checkOutPage}) => {
    await checkOutPage.placeOrder.click();

    const item = await checkOutPage.findErrorMsg('Billing Email address is a required field.')

    await expect(item).toBeVisible();
  })

  test("First name is required displayed when left blank", async({ page, checkOutPage}) => {
    await checkOutPage.placeOrder.click();

    const item = await checkOutPage.findErrorMsg('Billing First name is a required field.')

    await expect(item).toBeVisible();
  })

  test("Last name is required displayed when left blank", async({page, checkOutPage}) => {
    await checkOutPage.placeOrder.click();

    const item = await checkOutPage.findErrorMsg('Billing Last name is a required field.')

    await expect(item).toBeVisible();
  })
    
  test("Billing Street address is required displayed when left blank", async({page, checkOutPage}) => {
    await checkOutPage.placeOrder.click();

    const item = await checkOutPage.findErrorMsg('Billing Street address is a required field.')

    await expect(item).toBeVisible();
  })

  test("Billing ZIP Code is required displayed when left blank", async({page, checkOutPage}) => {
    await checkOutPage.placeOrder.click();

    const item = await checkOutPage.findErrorMsg('Billing ZIP Code is a required field.')

    await expect(item).toBeVisible();
  })

  test("Billing Phone is required displayed when left blank", async({page, checkOutPage}) => {
    await checkOutPage.placeOrder.click();

    const item = await checkOutPage.findErrorMsg('Billing Phone is a required field.')

    await expect(item).toBeVisible();
  })

  test("Billing Town/City is required displayed when left blank", async({page, checkOutPage}) => {
    await checkOutPage.placeOrder.click();

    const item = await checkOutPage.findErrorMsg('Billing Town / City is a required field.')

    await expect(item).toBeVisible();
  })

  test("Invalid payment method.", async({page, checkOutPage}) => {
    await checkOutPage.placeOrder.click();

    const item = await checkOutPage.findErrorMsg("Invalid payment method.")

    await expect(item).toBeVisible();
  })

  test("Note input being displayed", async({page, checkOutPage}) => {
    await checkOutPage.placeOrder.click();

    await expect(page.locator('textarea.input-text')).toBeVisible();
  })

  test("Place Order button being displayed", async({page, checkOutPage}) => {
    await checkOutPage.placeOrder.click();

    await expect(page.locator('#place_order')).toBeVisible();
  })
})

