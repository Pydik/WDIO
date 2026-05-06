import { $ } from '@wdio/globals'
import Page from './page.js';

class CheckoutStepOne extends Page {
    get firstName() {
        return $('[data-test="firstName"]');
    }
    get lastName() {
        return $('[data-test="lastName"]');
    }
    get zip() {
        return $('[data-test="postalCode"]');
    }
    get continueBnt() {
        return $('[data-test="continue"]');
    }

    async fillCheckout(firstName: string, lastName: string, zip: number) {
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.zip.setValue(zip);
    }

    async continueBntClick() {
        return await this.continueBnt.click();
    }
}

export default new CheckoutStepOne();