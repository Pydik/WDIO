import LoginPage from '../../pages/login.page.js'
import InventoryPage from '../../pages/inventory.page.js'
import { expect } from '@wdio/globals'



describe('Footer Links', () => {
    it('Footer Links', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        expect(InventoryPage.inventoryItem).toBeDisplayed()
        await InventoryPage.socialTwitterClick();
        expect(await browser.getUrl()).toContain('https://x.com/saucelabs');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');

        await InventoryPage.socialFacebookClick();
        expect(await browser.getUrl()).toContain('https://www.facebook.com/saucelabs');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');

        await InventoryPage.socialLinkedInClick();
        expect(await browser.getUrl()).toContain('https://www.linkedin.com/company/sauce-labs/');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');
    })

    
})