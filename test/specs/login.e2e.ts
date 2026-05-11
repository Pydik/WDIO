import LoginPage from "../../pages/login.page.js";
import InventoryPage from "../../pages/inventory.page.js";
import { errorMessages } from "../../test/data/messages.js";
import { userData } from "../../test/data/users.js";

describe("Login", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(userData.standardUser.username, userData.standardUser.password);
  });

  it("Valid Login", async () => {
    expect(InventoryPage.inventoryItem).toBeDisplayed();
  });

  it("Logout", async () => {
    expect(InventoryPage.inventoryItem).toBeDisplayed();
    await InventoryPage.openMenu();
    expect(InventoryPage.menuItem).toBeDisplayed();
    await InventoryPage.logout();
    expect(browser).toHaveUrl(expect.stringContaining(LoginPage.path));
    expect((LoginPage.inputUsername, LoginPage.inputPassword)).toHaveValue("");
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
    await LoginPage.open();
    await LoginPage.login(user.username, user.password);
    expect(LoginPage.error).toHaveText(expectedError);
  });
});
