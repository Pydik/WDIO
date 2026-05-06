import LoginPage from '../../pages/login.page.js'
import InventoryPage from '../../pages/inventory.page.js'
import CartPage from '../../pages/cart.page.js'
import CheckoutMain from '../../pages/checkoutMain.page.js'
import CheckoutStepTwo from '../../pages/checkoutStepTwo.page.js.js'
import CheckoutComplete from '../../pages/checkoutComplete.page.js'
import { expect } from '@wdio/globals'



describe('Checkout', () => {
    it('Valid Checkout', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        expect(InventoryPage.inventoryItem).toBeDisplayed()

        const products = await (InventoryPage.inventoryItem);
        const count = await products.length;
        const randomIndex = Math.floor(Math.random() * count);
        const selectedProduct = await products[randomIndex];
        const nameText = await selectedProduct.$('[data-test="inventory-item-name"]').getText();
        const addToCartButton = await selectedProduct.$('[class="btn btn_primary btn_small btn_inventory "]');
        await addToCartButton.click();
        expect(await InventoryPage.shoppingCart).toBeDisplayed();
        const cartButton = await $('[data-test="shopping-cart-link"]');
        await cartButton.click();
        const actualName = await $('[data-test="inventory-item-name"]').getText();
        await expect(actualName).toBe(nameText);

        await CartPage.checkoutClick();
        await CheckoutMain.fillCheckout('John', 'Doe', 12345);
        await CheckoutMain.continueBntClick();

        expect(await CheckoutStepTwo.title).toBeDisplayed();
        await expect(actualName).toBe(nameText);

        await CheckoutStepTwo.finishBtnClick();

        expect(await CheckoutComplete.completeHeader).toHaveText('Thank you for your order!');
        await CheckoutComplete.backHomeBtnClick();
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/inventory.html');
        expect(await InventoryPage.shoppingCart).not.toBeDisplayed();


    })

})