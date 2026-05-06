import LoginPage from '../../pages/login.page.js'
import InventoryPage from '../../pages/inventory.page.js'
import { expect } from '@wdio/globals'
import {errorMessages} from '../../test/data/messages.js'
import {userData} from '../../test/data/users.js'


describe('Login', () => {

beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login(userData.standardUser.username, userData.standardUser.password)
    });

    it('Valid Login', async () => {
        expect(InventoryPage.inventoryItem).toBeDisplayed()
    })

    it('Logout', async () => {
        await InventoryPage.openMenu()
        expect(InventoryPage.menuItem).toBeDisplayed()
        await InventoryPage.logout()
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/')
        expect(LoginPage.inputUsername).toHaveValue('');
        expect(LoginPage.inputPassword).toHaveValue('');
    })
})
    const negativeTests = [
        { user: userData.invalidUser, expectedError: errorMessages.invalidCredentials, testName: 'Login with invalid password' },
        { user: userData.lockedOutUser, expectedError: errorMessages.lockedOut, testName: 'Login with locked out test login' },
    ];

    negativeTests.forEach(({ user, expectedError, testName }) => {
        it.only(testName, async () => {
            await LoginPage.open()
            await LoginPage.login(user.username, user.password);
            await expect(LoginPage.error).toHaveText(expectedError);
        });
});