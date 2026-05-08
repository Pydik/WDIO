import LoginPage from "../../pages/login.page.js";
import InventoryPage from "../../pages/inventory.page.js";
import { expect } from "@wdio/globals";
import { userData } from "../data/users.js";
import CartPage from "../../pages/cart.page.js";

describe("Cart", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(
      userData.standardUser.username,
      userData.standardUser.password,
    );
    expect(InventoryPage.inventoryItem).toBeDisplayed();
  });

  it("Saving the card after logout ", async () => {
    const selectedProduct = await InventoryPage.getRandomProduct();
    const nameText = await InventoryPage.getProductName(selectedProduct);
    await InventoryPage.addProductToCart(selectedProduct);
    expect(await InventoryPage.shoppingCartBadge).toBeDisplayed();

    await InventoryPage.openMenu();
    expect(await InventoryPage.menuItem).toBeDisplayed();

    await InventoryPage.logout();
    expect(await browser.getUrl()).toContain(LoginPage.path);
    expect((LoginPage.inputUsername, LoginPage.inputPassword)).toHaveValue("");

    await LoginPage.login(
      userData.standardUser.username,
      userData.standardUser.password,
    );
    expect(InventoryPage.inventoryItem).toBeDisplayed();

    await InventoryPage.shoppingCart();
    const actualName = await CartPage.getCartItemName();
    expect(actualName).toContain(nameText);
  });
});
