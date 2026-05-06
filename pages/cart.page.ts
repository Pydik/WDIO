import { $ } from '@wdio/globals'
import Page from './page.js';

class CartPage extends Page {
    get checkout() {
        return $('[data-test="checkout"]');
    }

    public readonly path = 'cart.html';

    open() {
        return super.open(this.path);
    }

    get cartItemName() {
        return $('[data-test="inventory-item-name"]');
    }

    async getCartItemName() {
        return await this.cartItemName.getText();
    }

    async checkoutClick() {
        return await this.checkout.click();
    }
}

export default new CartPage();