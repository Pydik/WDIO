import { $ } from '@wdio/globals'
import Page from './page.js';

class CheckoutStepComplete extends Page {
    get finishBtn() {
        return $('[data-test="finish"]');
    }

    get backHomeBtn() {
        return $('[data-test="back-to-products"]');
    }

    get completeHeader() {
        return $('[data-test="complete-header"]');
    }

    async backHomeBtnClick() {
        await this.backHomeBtn.click();
    }
}

export default new CheckoutStepComplete();