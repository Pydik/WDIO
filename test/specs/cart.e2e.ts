import LoginPage from '../../pages/login.page.js'
import InventoryPage from '../../pages/inventory.page.js'
import { expect } from '@wdio/globals'



describe('Cart', () => {
    it('Saving the card after logout ', async () => {
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
        const cartButton = await $('[data-test="shopping-cart-link"]');
        await cartButton.click();
        const actualName = await $('[data-test="inventory-item-name"]').getText();
        await expect(actualName).toBe(nameText);
    })

})