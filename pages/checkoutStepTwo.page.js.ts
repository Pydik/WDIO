import { $ } from '@wdio/globals'
import Page from './page.js';

class CheckoutStepTwo extends Page {
    get finishBtn() {
        return $('[data-test="finish"]');
    }

    get title() {
        return $('[data-test="title"]');
    }

    async finishBtnClick() {
        return await this.finishBtn.click();
    }
}

export default new CheckoutStepTwo();