import { $ } from '@wdio/globals'
import Page from './page.js';
class LoginPage extends Page {

    public get inputUsername () {
        return $('[data-test="username"]');
    }

    public get inputPassword () {
        return $('[data-test="password"]');
    }

    public get btnSubmit () {
        return $('[data-test="login-button"]');
    }   
    
    public get inventoryItem () {
        return $('[data-test="inventory-item"]');
    }

    get errorIcon() {
        return $$('[data-icon="times-circle"]');
    }

    get error() {
        return $('[data-test="error"]');
    }

    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    public open () {
        return super.open('');
    }
}

export default new LoginPage();
