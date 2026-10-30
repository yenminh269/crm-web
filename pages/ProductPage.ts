import { Locator, Page } from "@playwright/test";
import { formartPrice } from "../utils/helper";

export class ProductPage {
  readonly title : Locator;
  readonly page : Page;
  readonly description : Locator;
  readonly quantity : Locator;
  readonly img : Locator;
  readonly addToCartButton : Locator;
  readonly noItemInCart : Locator;
  readonly viewCartButton : Locator;
  readonly quantityInput : Locator;
  readonly cartIcon : Locator;
  readonly relatedProduct : Locator;
  readonly continueShoppingButton : Locator
  readonly viewCartModal : Locator
  readonly checkOutButton : Locator

  constructor(page : Page) {
    this.title = page.locator('h1');
    this.description = page.locator("div[class='woocommerce-product-details__short-description'] p:nth-child(1)")
    this.page = page;
    this.quantity = page.locator('input[name="quantity"]');
    this.img = page.locator('.zoomImg');
    this.addToCartButton = page.locator('button[name="add-to-cart"]');
    this.noItemInCart = page.locator("i.ast-icon-shopping-basket");
    this.viewCartButton = page.getByTitle('View cart');
    this.quantityInput = page.locator('[name="quantity"]');
    this.cartIcon = page.locator(".ast-site-header-cart-li");
    this.relatedProduct = page.locator('h2.woocommerce-loop-product__title');
    this.continueShoppingButton = page.getByRole('link', { name: 'Continue Shopping' })
    this.viewCartModal = page.getByRole('link', { name: 'View cart' })
    this.checkOutButton = page.getByRole('link', { name: 'Checkout' })
  }

  async getImage() : Promise<boolean> {
    return await this.img.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
    )
  }

  async getQuantity() : Promise<string> {
    return await this.quantity.inputValue()
  }

  async addItemToCart(quantity : string) : Promise<void> {
    await this.quantityInput.fill(quantity);

    await this.addToCartButton.click();

    await this.viewCartButton.click();
    console.log("Added item in cart");
  }

  async getProductPrice() : Promise<any> {
    const productPrice = await this.page.locator("p.price bdi").textContent();
    console.log("Product price: " + productPrice);

    return await formartPrice(productPrice);
  }
}
