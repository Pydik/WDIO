import LoginPage from '../../pages/login.page.js'
import InventoryPage from '../../pages/inventory.page.js'
import { expect } from '@wdio/globals'



describe('Login', () => {
    it('Valid Login', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        expect(InventoryPage.inventoryItem).toBeDisplayed()

        await InventoryPage.sortByLoHiClick();
        await browser.pause(25000);


        const pricesLoHi = await $$('[class="inventory_item_price"]');
        const priceValuesLoHi = [];

         for (let priceElement of pricesLoHi) {
            const priceText = await priceElement.getText();
            const price = parseFloat(priceText.replace('$', '').replace(',', ''));
            priceValuesLoHi.push(price)
        }
        const sortedNamesDesc = [...priceValuesLoHi].sort((a, b) => a - b)

        //browser.pause(25000);

        const sortedPrices = await pricesLoHi.map(async (el) => await el.getText());
        console.log(priceValuesLoHi, sortedPrices , 'dsfgerdg')
        expect(sortedNamesDesc).toEqual(sortedPrices);

    })

})