import { $ } from '@wdio/globals'
import Page from './page.js';

class CheckoutStepTwo extends Page {
    get finishBtn() {
        return $('[data-test="finish"]');
    }

    get title() {
        return $('[data-test="title"]');
    }

    get inventoryItemPrice() {
        return $$('[data-test="inventory-item-price"]');
    }

    get inventoryItemName() {
        return $('[data-test="inventory-item-name"]');
    }

    async getInventoryItemPrice() {
        return await this.inventoryItemPrice[0].getText();
    }

    async getInventoryItemName() {
        return await this.inventoryItemName.getText();
    }

    public readonly path = 'checkout-step-two.html';

    open () {    
        return super.open(this.path);
    }

    async finishBtnClick() {
        return await this.finishBtn.click();
    }
}

export default new CheckoutStepTwo();