import { $ } from '@wdio/globals'
import Page from './page.js';
class InventoryPage extends Page {
    
    public get openMenuBtn () {
        return $('#react-burger-menu-btn');
    }  

    public get menuItem () {
        return $$('[class="bm-item menu-item"]');
    }

    public get inventoryItem () {
        return $$('[data-test="inventory-item-description"]');
    }

    public get logout () {
        return $('#logout_sidebar_link');
    }

        public get addToCartBtn () {
        return $('[class="btn btn_primary btn_small btn_inventory "]');
    }
    
    public async openMenuBtnClick () {
        await this.openMenuBtn.click();
    }

    public async logoutClick () {
        await this.logout.click();
    }

    public async addToCartBtnClick () {
        await this.addToCartBtn.click();
    }

    public open () {    
        return super.open('');
    }
}

export default new InventoryPage();
