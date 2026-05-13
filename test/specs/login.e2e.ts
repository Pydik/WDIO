import inventoryPage from "../../pages/inventory.page.js";
import loginPage from "../../pages/login.page.js";
import { errorMessages } from "../../test/data/messages.js";
import { userData } from "../../test/data/users.js";

describe("Login", () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login(userData.standardUser.username, userData.standardUser.password);
  });

  it("Valid Login", async () => {
    expect(inventoryPage.inventoryItem).toBeDisplayed();
  });

  it("Logout", async () => {
    expect(inventoryPage.inventoryItem).toBeDisplayed();
    await inventoryPage.openMenu();
    expect(inventoryPage.menuItem).toBeDisplayed();
    await inventoryPage.logout();
    expect(browser).toHaveUrl(expect.stringContaining(loginPage.path));
    expect((loginPage.inputUsername, loginPage.inputPassword)).toHaveValue("");
  });
});
const negativeTests = [
  {
    testName: "Login with invalid password",
    user: userData.invalidUser,
    expectedError: errorMessages.invalidCredentials,
  },
  {
    testName: "Login with locked out test login",
    user: userData.lockedOutUser,
    expectedError: errorMessages.lockedOut,
  },
];

negativeTests.forEach(({ testName, user, expectedError }) => {
  it(testName, async () => {
    await loginPage.open();
    await loginPage.login(user.username, user.password);
    expect(loginPage.error).toHaveText(expectedError);
  });
});
