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
 
    public get sortByLoHi() {
        return $('[class="product_sort_container"] [value="lohi"]');
    }
    
    public get socialTwitter() {
        return $('[data-test="social-twitter"]');
    }

    public get socialFacebook() {
        return $('[data-test="social-facebook"]');
    }

    public get socialLinkedIn() {
        return $('[data-test="social-linkedin"]');
    }

    public get shoppingCart() {
        return $('[data-test="shopping-cart-badge"]');
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
    
    async sortByLoHiClick() {
        await this.sortByLoHi.click();
    }

    async socialTwitterClick() {
        await this.socialTwitter.click();
        await browser.switchWindow('https://x.com/saucelabs');
    }
    async socialFacebookClick() {
        await this.socialFacebook.click();
        await browser.switchWindow('https://www.facebook.com/saucelabs');
    }
    async socialLinkedInClick() {
        await this.socialLinkedIn.click();
        await browser.switchWindow('https://www.linkedin.com/company/sauce-labs/');
    }
}

export default new InventoryPage();
