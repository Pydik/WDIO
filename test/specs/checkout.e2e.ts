import LoginPage from '../../pages/login.page.js'
import InventoryPage from '../../pages/inventory.page.js'
import CartPage from '../../pages/cart.page.js'
import CheckoutMain from '../../pages/checkoutMain.page.js'
import CheckoutStepTwoPage from '../../pages/checkoutStepTwo.page.js.js'
import CheckoutCompletePage from '../../pages/checkoutComplete.page.js'
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
        expect(await InventoryPage.shoppingCartBadge).toBeDisplayed();
        
        await InventoryPage.shoppingCartBadge.click();
        const actualName = await CartPage.getCartItemName();
        await expect(actualName).toBe(nameText);

        await CartPage.checkoutBtn();
        await CheckoutMain.fillCheckout(userData.getRandomValuesUser.username, 
                                        userData.getRandomValuesUser.password, 
                                        userData.getRandomValuesUser.postalCode);
        await CheckoutMain.continue();
        expect(price).toBe(await CheckoutStepTwoPage.getInventoryItemPrice());

        expect(await CheckoutStepTwoPage.title).toBeDisplayed();
        const cartItemNameOnStepTwo = await CheckoutStepTwoPage.getInventoryItemName();
        await expect(cartItemNameOnStepTwo).toBe(nameText);
        await CheckoutStepTwoPage.finish();
        await expect(browser).toHaveUrl(expect.stringContaining(CheckoutCompletePage.path));
        expect(await CheckoutCompletePage.completeHeader).toHaveText('Thank you for your order!');

        await CheckoutCompletePage.backHome();
        await expect(browser).toHaveUrl(expect.stringContaining(InventoryPage.path));
        expect(await InventoryPage.shoppingCartBadge).not.toBeDisplayed();
    })

})