import { $ } from '@wdio/globals'
import Page from './page.js';

class CartPage extends Page {
    get checkout() {
        return $('[data-test="checkout"]');
    }

    async checkoutClick() {
        return await this.checkout.click();
    }
}

export default new CartPage();