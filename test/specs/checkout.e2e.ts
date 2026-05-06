import LoginPage from '../../pages/login.page.js'
import InventoryPage from '../../pages/inventory.page.js'
import CartPage from '../../pages/cart.page.js'
import CheckoutMain from '../../pages/checkoutMain.page.js'
import CheckoutStepTwo from '../../pages/checkoutStepTwo.page.js.js'
import CheckoutComplete from '../../pages/checkoutComplete.page.js'
import { expect } from '@wdio/globals'
import { userData } from '../data/users.js'

describe('Checkout', () => {

    beforeEach(async () => {
            await LoginPage.open()
            await LoginPage.login(userData.standardUser.username, userData.standardUser.password)
            expect(InventoryPage.inventoryItem).toBeDisplayed()
        });

    it('Valid Checkout', async () => {

        const selectedProduct = await InventoryPage.getRandomProduct();
        const nameText = await InventoryPage.getProductName(selectedProduct);
        const price = await InventoryPage.getProductPrice({ product: selectedProduct });
        await InventoryPage.addProductToCart(selectedProduct);
        expect(await InventoryPage.shoppingCart).toBeDisplayed();
        
        await InventoryPage.shoppingCart.click();
        const actualName = await CartPage.getCartItemName();
        await expect(actualName).toBe(nameText);

        await CartPage.checkoutClick();
        await CheckoutMain.fillCheckout(userData.getRandomValuesUser.username, 
                                        userData.getRandomValuesUser.password, 
                                        userData.getRandomValuesUser.postalCode);
        await CheckoutMain.continueBntClick();
        expect(price).toBe(await CheckoutStepTwo.getInventoryItemPrice());

        expect(await CheckoutStepTwo.title).toBeDisplayed();
        const cartItemNameOnStepTwo = await CheckoutStepTwo.getInventoryItemName();
        await expect(cartItemNameOnStepTwo).toBe(nameText);
        await CheckoutStepTwo.finishBtnClick();
        await expect(browser).toHaveUrl(expect.stringContaining(CheckoutComplete.path));
        expect(await CheckoutComplete.completeHeader).toHaveText('Thank you for your order!');

        await CheckoutComplete.backHomeBtnClick();
        await expect(browser).toHaveUrl(expect.stringContaining(InventoryPage.path));
        expect(await InventoryPage.shoppingCart).not.toBeDisplayed();
    })

})