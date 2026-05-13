import loginPage from "../../pages/login.page.js";
import inventoryPage from "../../pages/inventory.page.js";
import { userData } from "../data/users.js";
import cartPage from "../../pages/cart.page.js";

describe("Cart", () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login(userData.standardUser.username, userData.standardUser.password);
  });

  it("Saving the card after logout ", async () => {
    expect(inventoryPage.inventoryItem).toBeDisplayed();
    const selectedProduct = await inventoryPage.getRandomProduct();
    const nameText = await inventoryPage.getProductName(selectedProduct);
    await inventoryPage.addProductToCart(selectedProduct);
    expect(inventoryPage.shoppingCartBadge).toBeDisplayed();

    await inventoryPage.openMenu();
    expect(inventoryPage.menuItem).toBeDisplayed();

    await inventoryPage.logout();
    expect(await browser.getUrl()).toContain(loginPage.path);
    expect((loginPage.inputUsername, loginPage.inputPassword)).toHaveValue("");

    await loginPage.login(userData.standardUser.username, userData.standardUser.password);
    expect(inventoryPage.inventoryItem).toBeDisplayed();

    await inventoryPage.shoppingCart();
    const actualName = await cartPage.getCartItemName();
    expect(actualName).toContain(nameText);
  });
});
