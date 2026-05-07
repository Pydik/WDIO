import { $ } from '@wdio/globals'
import Page from './page.js';
import { ChainablePromiseElement } from 'webdriverio';
class InventoryPage extends Page {
    
    get openMenuBtn () {
        return $('#react-burger-menu-btn');
    }  

    get menuItem () {
        return $$('[class="bm-item menu-item"]');
    }

    get inventoryItem ( ) {
        return $$('[data-test="inventory-item-description"]');
    }

    get logoutBtn () {
        return $('[data-test="logout-sidebar-link"]');
    }

    get addToCartBtn () {
       return '[class="btn btn_primary btn_small btn_inventory "]';
    }

    get cartBtn() {
        return $('[data-test="shopping-cart-link"]');
    }
 
    get sortByLoHi() {
        return $('[class="product_sort_container"] [value="lohi"]');
    }

    get sortByHiLo() {
        return $('[class="product_sort_container"] [value="hilo"]');
    }
    get sortByNameaz() {
        return $('[class="product_sort_container"] [value="az"]');
    }

        get sortByNameza() {
        return $('[class="product_sort_container"] [value="za"]');
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

    get shoppingCartBadge() {
        return $('[data-test="shopping-cart-badge"]');
    }

    get itemsName() {
        return '[data-test="inventory-item-name"]';
    }

    get itemName() {
        return '[data-test="inventory-item-name"]';
    }

    get itemPrice() {
        return '[data-test="inventory-item-price"]';
    }

    async getRandomProduct() {
        const products = await this.inventoryItem;
        return products[(Math.floor(Math.random() * await products.length))];
    }

    async getProductName(product: ChainablePromiseElement) {
        return await product.$(this.itemName).getText();
    }

    async getProductPrice({ product }: { product: any; }): Promise<any> {
        return await product.$(this.itemPrice).getText();
    }

    async addProductToCart(product: ChainablePromiseElement) {
        await product.$(this.addToCartBtn).click();
    }

    async openMenu () {
        await this.openMenuBtn.click();
    }
    
    async logout () {
        await this.logoutBtn.click();
    }
    
    async addToCart () {
        await $(this.addToCartBtn).click();
    }

    async shoppingCart() {
        await this.cartBtn.click();
    }

    public readonly path = 'inventory.html';

    open () {    
        return super.open(this.path);
    }
    
    async sortByLoHiClick() {
        await this.sortByLoHi.click();
    }

    async sortByHiLoClick() {
        await this.sortByHiLo.click();
    }

    async sortByNameAZ() {
        await this.sortByNameaz.click();
    }

        async sortByNameZA() {
        await this.sortByNameza.click();
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