import { test, expect } from "../fixtures/pages";
import { productPageLink } from "../utils/constants";
import { goto } from "../utils/helper";

test.describe('Check Out', () => {
  test.beforeEach( async({ page, productPage, cartPage, checkOutPage }) => {
    await goto(page, productPageLink)
    await productPage.addItemToCart("1")
    await cartPage.checkOut()
    await checkOutPage.placeOrder()
  })

  test("Email Address is required displayed when left blank", async({checkOutPage}) => {
    const emailAddress = await checkOutPage.findErrorMsg('Billing Email address is a required field.')
    
    await expect(emailAddress).toBeVisible();
  })

  test("First name is required displayed when left blank", async({ checkOutPage}) => {
    const firstName = await checkOutPage.findErrorMsg('Billing First name is a required field.')

    await expect(firstName).toBeVisible();
  })

  test("Last name is required displayed when left blank", async({ checkOutPage}) => {
    const lastName = await checkOutPage.findErrorMsg('Billing Last name is a required field.')

    await expect(lastName).toBeVisible();
  })
    
  test("Billing Street address is required displayed when left blank", async({checkOutPage}) => {
    const streetAddress = await checkOutPage.findErrorMsg('Billing Street address is a required field.')

    await expect(streetAddress).toBeVisible();
  })

  test("Billing ZIP Code is required displayed when left blank", async({checkOutPage}) => {
    const zipCode = await checkOutPage.findErrorMsg('Billing ZIP Code is a required field.')

    await expect(zipCode).toBeVisible();
  })

  test("Billing Phone is required displayed when left blank", async({checkOutPage}) => {
    const phone = await checkOutPage.findErrorMsg('Billing Phone is a required field.')

    await expect(phone).toBeVisible();
  })

  test("Billing Town/City is required displayed when left blank", async({ checkOutPage}) => {
    const town = await checkOutPage.findErrorMsg('Billing Town / City is a required field.')

    await expect(town).toBeVisible();
  })

  test("Invalid payment method.", async({checkOutPage}) => {
    const paymentMethod = await checkOutPage.findErrorMsg("Invalid payment method.")

    await expect(paymentMethod).toBeVisible();
  })

  test("Note input being displayed", async({checkOutPage}) => {
    await expect(checkOutPage.noteInput).toBeVisible();
  })

  test("Place Order button being displayed", async({checkOutPage}) => {
    await expect(checkOutPage.placeOrderButton).toBeVisible();
  })
})

