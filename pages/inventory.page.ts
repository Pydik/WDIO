import { $ } from '@wdio/globals'
import Page from './page.js';
class LoginPage extends Page {
    
    public get openMenuBtn () {
        return $('#react-burger-menu-btn');
    }  

    public get menuItem () {
        return $$('[class="bm-item menu-item"]');
    }

    public get inventoryItem () {
        return $('[data-test="inventory-item"]');
    }

    public get logout () {
        return $('#logout_sidebar_link');
    }
    
    public async openMenuBtnClick () {
        await this.openMenuBtn.click();
    }

    public async logoutClick () {
        await this.logout.click();
    }

    public open () {    
        return super.open('');
    }
}

export default new LoginPage();
