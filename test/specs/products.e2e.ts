import LoginPage from '../../pages/login.page.js'
import InventoryPage from '../../pages/inventory.page.js'
import { expect } from '@wdio/globals'
import { userData } from '../data/users.js'

    beforeEach(async () => {
            await LoginPage.open()
            await LoginPage.login(userData.standardUser.username, userData.standardUser.password)
            expect(InventoryPage.inventoryItem).toBeDisplayed()
        });

describe('Products', () => {
    it('Sorting by Price: Low to High', async () => {
         await InventoryPage.sortByLoHiClick();

        const pricesLoHi = await $$('[class="inventory_item_price"]');
        const priceValuesLoHi = [];

         for (let priceElement of pricesLoHi) {
            const priceText = await priceElement.getText();
            priceValuesLoHi.push(priceText)
        }
        const sortedNamesDesc = [...priceValuesLoHi].sort()

        const sortedPrices = await pricesLoHi.map(async (el) => await el.getText());
        console.log(priceValuesLoHi, sortedPrices , 'dsfgerdg')
        expect(sortedNamesDesc).toEqual(expect.arrayContaining(sortedPrices));
    })

        it('Sorting by Price: High to Low', async () => {
         await InventoryPage.sortByHiLoClick();

        const pricesHiLo = await $$('[class="inventory_item_price"]');
        const priceValuesHiLo = [];

         for (let priceElement of pricesHiLo) {
            const priceText = await priceElement.getText();
            priceValuesHiLo.push(priceText)
        }
        const sortedNamesDesc = [...priceValuesHiLo].sort()

        const sortedPrices = await pricesHiLo.map(async (el) => await el.getText());
        console.log(priceValuesHiLo, sortedPrices , 'dsfgerdg')
        expect(sortedNamesDesc).toEqual(expect.arrayContaining(sortedPrices));
    })

    it('Sorting by Name: A to Z', async () => {
        
        const namesAZ = await $$('[data-test="inventory-item-name"]');
        const nameValuesAZ = [];
        
        for (let nameElement of namesAZ) {
            const nameText = await nameElement.getText();
            nameValuesAZ.push(nameText)
        }
        await InventoryPage.sortByNameAZ();
        const sortedNamesDesc = [...nameValuesAZ].sort()

        const sortedNames = await namesAZ.map(async (el) => await el.getText());
        console.log(nameValuesAZ, sortedNames , 'dsfgerdg')
        expect(sortedNamesDesc).toEqual(sortedNames);
    })

        it('Sorting by Name: Z to A', async () => {
            
            const namesZA = await $$('[data-test="inventory-item-name"]');
            const nameValuesZA = [];
            
            
            for (let nameElement of namesZA) {
                const nameText = await nameElement.getText();
                nameValuesZA.push(nameText)
            }
            
            await InventoryPage.sortByNameZA();

        const sortedNamesDesc = [...nameValuesZA].sort().reverse()
        
        const sortedNames = await namesZA.map(async (el) => await el.getText());
        const sortedNamesZA = [...sortedNames].sort().reverse()
        expect(sortedNamesDesc).toEqual(sortedNamesZA);
    })

})
