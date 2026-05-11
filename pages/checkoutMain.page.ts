import Page from "./page.js";

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
  get continueBtn() {
    return $('[data-test="continue"]');
  }

  get errorMessage() {
    return $(".error-message-container");
  }

  public readonly path = "checkout-step-one.html";

  open() {
    return super.open(this.path);
  }

  async fillCheckout(firstName: string, lastName: string, zip: number) {
    await this.firstName.setValue(firstName);
    await this.lastName.setValue(lastName);
    await this.zip.setValue(zip);
  }

  async continue() {
    return await this.continueBtn.click();
  }
}

export default new CheckoutStepOne();
