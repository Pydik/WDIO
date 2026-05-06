import { $ } from '@wdio/globals'
import Page from './page.js';
class InventoryPage extends Page {
    
    get openMenuBtn () {
        return $('#react-burger-menu-btn');
    }  

    get menuItem () {
        return $$('[class="bm-item menu-item"]');
    }

    get inventoryItem () {
        return $$('[data-test="inventory-item-description"]');
    }

    get logoutBtn () {
        return $('#logout_sidebar_link');
    }

    get addToCartBtn () {
       return $('[class="btn btn_primary btn_small btn_inventory "]');
    }
 
    get sortByLoHi() {
        return $('[class="product_sort_container"] [value="lohi"]');
    }
    
    get socialTwitterIcon() {
        return $('[data-test="social-twitter"]');
    }

    get socialFacebookIcon() {
        return $('[data-test="social-facebook"]');
    }

    get socialLinkedInIcon() {
        return $('[data-test="social-linkedin"]');
    }

    get shoppingCart() {
        return $('[data-test="shopping-cart-badge"]');
    }
    
    async openMenu () {
        await this.openMenuBtn.click();
    }
    
    async logout () {
        await this.logoutBtn.click();
    }
    
    async addToCart () {
        await this.addToCartBtn.click();
    }

    open () {    
        return super.open('');
    }
    
    async sortByLoHiClick() {
        await this.sortByLoHi.click();
    }

    async socialTwitter() {
        await this.socialTwitterIcon.click();
        await browser.switchWindow('https://x.com/saucelabs');
    }
    async socialFacebook() {
        await this.socialFacebookIcon.click();
        await browser.switchWindow('https://www.facebook.com/saucelabs');
    }
    async socialLinkedIn() {
        await this.socialLinkedInIcon.click();
        await browser.switchWindow('https://www.linkedin.com/company/sauce-labs/');
    }

}

export default new InventoryPage();
