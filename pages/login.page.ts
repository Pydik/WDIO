import Page from "./page.js";
class LoginPage extends Page {
  get inputUsername() {
    return $('[data-test="username"]');
  }

  get inputPassword() {
    return $('[data-test="password"]');
  }

  get btnSubmit() {
    return $('[data-test="login-button"]');
  }

  get inventoryItem() {
    return $('[data-test="inventory-item"]');
  }

  get errorIcon() {
    return $$('[data-icon="times-circle"]');
  }

  get error() {
    return $('[data-test="error"]');
  }

  async login(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  public readonly path = "";

  open() {
    return super.open(this.path);
  }
}

export default new LoginPage();
