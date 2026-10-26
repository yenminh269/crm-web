import { Locator, Page } from "@playwright/test";

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
  }

  async getProductPrice() : Promise<any> {
    const productPrice = await this.page.locator("p.price bdi").textContent();

    const value = productPrice?.replace('$', '');

    console.log("Product price: " + value);

    return value;
  }

  async getProductLocator(name : string ) : Promise<Locator> {
    return this.page.locator('ul.products li div').filter({
      has: this.page.locator('h2', { hasText: name })
    });
  }
}