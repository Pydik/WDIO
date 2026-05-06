import LoginPage from '../../pages/login.page.js'
import InventoryPage from '../../pages/inventory.page.js'
import { expect } from '@wdio/globals'
import {userData} from '../../test/data/users.js'
import {linkUrls} from '../../test/data/links.js'



describe('Footer Links', () => {

        const linkChecker = [
            { user: userData.standardUser, linkUrls: linkUrls.Twitter, methodName: 'socialTwitter' },
            { user: userData.standardUser, linkUrls: linkUrls.Facebook, methodName: 'socialFacebook' },
            { user: userData.standardUser, linkUrls: linkUrls.LinkedIn, methodName: 'socialLinkedIn' },
        ];

            it('should verify all footer links in one session', async () => {
                await LoginPage.open();
                await LoginPage.login(userData.standardUser.username, userData.standardUser.password);
                for (const { linkUrls, methodName } of linkChecker) {
                await (InventoryPage as any)[methodName]();
                await expect(browser).toHaveUrl(expect.stringContaining(linkUrls));
                await browser.closeWindow();
            }
        });
    },
)