import Page from "./page.js";

class CartPage extends Page {
  get checkout() {
    return $('[data-test="checkout"]');
  }

  public readonly path = "cart.html";

  open() {
    return super.open(this.path);
  }

  get cartItemName() {
    return $$('[data-test="inventory-item-name"]');
  }

  async getCartItemName() {
    return this.cartItemName.map((item) => item.getText());
  }

  async checkoutBtn() {
    return await this.checkout.click();
  }
}

export default new CartPage();
