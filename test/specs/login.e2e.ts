import LoginPage from '../../pages/login.page.js'
import InventoryPage from '../../pages/inventory.page.js'
import { expect } from '@wdio/globals'



describe('Login', () => {
    it('Valid Login', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        expect(InventoryPage.inventoryItem).toBeDisplayed()
    })

    it('Login with invalid password', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secrt_sauce')
        expect(LoginPage.errorIcon).toBeDisplayed()
        expect(LoginPage.error).toHaveText('"Epic sadface: Username and password do not match any user in this service" error message is displayed')
    })

     it('Login with locked out test login', async () => {
        await LoginPage.open()
        await LoginPage.login('locked_out_user', 'secret_sauce')
        expect(LoginPage.errorIcon).toBeDisplayed()
        expect(LoginPage.error).toHaveText('"Epic sadface: Sorry, this user has been locked out." error message is displayed')
    })

    it('Logout', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.openMenuBtnClick()
        expect(InventoryPage.menuItem).toBeDisplayed()
        await InventoryPage.logoutClick()
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/')
        expect(LoginPage.inputUsername).toHaveValue('');
        expect(LoginPage.inputPassword).toHaveValue('');
    })
})